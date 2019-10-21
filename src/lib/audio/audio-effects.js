import EchoEffect from './effects/echo-effect.js';
import RobotEffect from './effects/robot-effect.js';
import VolumeEffect from './effects/volume-effect.js';
import FadeEffect from './effects/fade-effect.js';
import MuteEffect from './effects/mute-effect.js';

const effectTypes = {
    ROBOT: 'robot',
    REVERSE: 'reverse',
    LOUDER: 'higher',
    SOFTER: 'lower',
    FASTER: 'faster',
    SLOWER: 'slower',
    ECHO: 'echo',
    FADEIN: 'fade in',
    FADEOUT: 'fade out',
    MUTE: 'mute',
    HIGHER: 'higherPitch',
    LOWER: 'lowerPitch'
};

class AudioEffects {
    static get effectTypes () {
        return effectTypes;
    }
    constructor (buffer, name, trimStart, trimEnd, superpowered) {
        this.superpowered = superpowered;

        this.trimStartSeconds = (trimStart * buffer.length) / buffer.sampleRate;
        this.trimEndSeconds = (trimEnd * buffer.length) / buffer.sampleRate;
        this.adjustedTrimStartSeconds = this.trimStartSeconds;
        this.adjustedTrimEndSeconds = this.trimEndSeconds;

        // Some effects will modify the playback rate and/or number of samples.
        // Need to precompute those values to create the offline audio context.
        const pitchRatio = Math.pow(2, 4 / 12); // A major third
        let sampleCount = buffer.length;
        const affectedSampleCount = Math.floor((this.trimEndSeconds - this.trimStartSeconds) *
            buffer.sampleRate);
        let adjustedAffectedSampleCount = affectedSampleCount;
        const unaffectedSampleCount = sampleCount - affectedSampleCount;

        this.playbackRate = 1;
        this.pitchShift = 0;
        switch (name) {
        case effectTypes.ECHO:
            sampleCount = Math.max(sampleCount,
                Math.floor((this.trimEndSeconds + EchoEffect.TAIL_SECONDS) * buffer.sampleRate));
            break;
        case effectTypes.FASTER:
            this.playbackRate = pitchRatio;
            adjustedAffectedSampleCount = Math.floor(affectedSampleCount / this.playbackRate);
            sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;

            break;
        case effectTypes.SLOWER:
            this.playbackRate = 1 / pitchRatio;
            adjustedAffectedSampleCount = Math.floor(affectedSampleCount / this.playbackRate);
            sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;
            break;
        case effectTypes.HIGHER:
            this.pitchShift = 4;
            break;
        case effectTypes.LOWER:
            this.pitchShift = -4;
            break;
        }

        const durationSeconds = sampleCount / buffer.sampleRate;
        this.adjustedTrimEndSeconds = this.trimStartSeconds +
            (adjustedAffectedSampleCount / buffer.sampleRate);
        this.adjustedTrimStart = this.adjustedTrimStartSeconds / durationSeconds;
        this.adjustedTrimEnd = this.adjustedTrimEndSeconds / durationSeconds;

        if (window.OfflineAudioContext) {
            this.audioContext = new window.OfflineAudioContext(1, sampleCount, buffer.sampleRate);
        } else {
            // Need to use webkitOfflineAudioContext, which doesn't support all sample rates.
            // Resample by adjusting sample count to make room and set offline context to desired sample rate.
            const sampleScale = 44100 / buffer.sampleRate;
            this.audioContext = new window.webkitOfflineAudioContext(1, sampleScale * sampleCount, 44100);
        }

        // For the reverse effect we need to manually reverse the data into a new audio buffer
        // to prevent overwriting the original, so that the undo stack works correctly.
        // Doing buffer.reverse() would mutate the original data.
        if (name === effectTypes.REVERSE) {
            const originalBufferData = buffer.getChannelData(0);
            const newBuffer = this.audioContext.createBuffer(1, buffer.length, buffer.sampleRate);
            const newBufferData = newBuffer.getChannelData(0);
            const bufferLength = buffer.length;

            const startSamples = Math.floor(this.trimStartSeconds * buffer.sampleRate);
            const endSamples = Math.floor(this.trimEndSeconds * buffer.sampleRate);
            let counter = 0;
            for (let i = 0; i < bufferLength; i++) {
                if (i >= startSamples && i < endSamples) {
                    newBufferData[i] = originalBufferData[endSamples - counter - 1];
                    counter++;
                } else {
                    newBufferData[i] = originalBufferData[i];
                }
            }
            this.buffer = newBuffer;
        } else {
            // All other effects use the original buffer because it is not modified.
            this.buffer = buffer;
        }

        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.name = name;
    }
    setupSuperpowered () {
        return new Promise(resolve => {
            return this.superpowered.createAudioNode(this.audioContext, './static/processor.js', 'MyProcessor',
                newNode => {
                    console.log('superpowered node ready');
                    this.superpoweredNode = newNode;
                },
                // runs when the audio node sends a message
                message => {
                    console.log('Message received from the audio node: ' + message.someText);
                    resolve();
                }
            );
        });
    }
    process (done) {
        // Some effects need to use more nodes and must expose an input and output
        let input;
        let output;
        switch (this.name) {
        case effectTypes.HIGHER:
        case effectTypes.LOWER:
            this.superpoweredNode.sendMessageToAudioScope({
                left: this.buffer.getChannelData(0),
                right: this.buffer.getChannelData(0),
                pitchShift: this.pitchShift // 0 //
            });
            output = this.superpoweredNode;

            // Constructor.
            // let analyzer = this.superpowered.new('Analyzer',
            //     this.buffer.sampleRate, // The sample rate of the audio input.
            //     this.buffer.duration     // The length in seconds of the audio input. The analyzer will not be able to process more audio than this. You can change this value in the process() method.
            // );
            //
            // let myBuffer = this.superpowered.createFloatArray(this.buffer.length);
            //
            // this.superpowered.Interleave(
            //     this.buffer.getChannelData(0),
            //     this.buffer.getChannelData(0),
            //     myBuffer.pointer,
            //     this.buffer.length
            // )
            //
            // // Processes some audio. This method can be used in a real-time audio thread if lengthSeconds is -1. Has no return value.
            // analyzer.process(
            //     myBuffer.pointer, // Pointer to floating point numbers. 32-bit interleaved stereo input.
            //     this.buffer.length,   // Number of frames to process.
            //     -1     // If the audio input length may change, set this to the current length. Use -1 otherwise. If this value is not -1, this method can NOT be used in a real-time audio thread.
            // );
            //
            // // Makes results from the collected data. This method should NOT be used in a real-time audio thread, because it allocates memory. Has no return value.
            // analyzer.makeResults(
            //     60,   // Detected bpm will be more than or equal to this. Recommended value: 60.
            //     200,  // Detected bpm will be less than or equal to this. Recommended value: 200.
            //     0,    // If you know the bpm set it here. Use 0 otherwise.
            //     0,    // Provides a "hint" for the analyzer with this. Use 0 otherwise.
            //     true, // True: calculate beatgridStartMs. False: save some CPU with not calculating it.
            //     0,    // Provides a "hint" for the analyzer with this. Use 0 otherwise.
            //     false, // True: make overviewWaveform. False: save some CPU and memory with not making it.
            //     false, // True: make the low/mid/high waveforms. False: save some CPU and memory with not making them.
            //     true  // True: calculate keyIndex. False: save some CPU with not calculating it.
            // );
            // debugger;
            break;
        case effectTypes.FASTER:
        case effectTypes.SLOWER:
            this.superpoweredNode.sendMessageToAudioScope({
                left: this.buffer.getChannelData(0),
                right: this.buffer.getChannelData(0),
                rate: this.playbackRate * 10000
            });
            output = this.superpoweredNode;
            break;
        case effectTypes.LOUDER:
            ({input, output} = new VolumeEffect(this.audioContext, 1.25,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.SOFTER:
            ({input, output} = new VolumeEffect(this.audioContext, 0.75,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.ECHO:
            ({input, output} = new EchoEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.ROBOT:
            ({input, output} = new RobotEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.FADEIN:
            ({input, output} = new FadeEffect(this.audioContext, true,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.FADEOUT:
            ({input, output} = new FadeEffect(this.audioContext, false,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.MUTE:
            ({input, output} = new MuteEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        }

        if (input && output) {
            this.source.connect(input);
            output.connect(this.audioContext.destination);
        }
        if (!input && !output) {
            // No effects nodes are needed, wire directly to the output
            this.source.connect(this.audioContext.destination);
        }
        if (!input && output === this.superpoweredNode) {
            output.connect(this.audioContext.destination);
        }

        this.source.start();

        this.audioContext.startRendering();
        this.audioContext.oncomplete = ({renderedBuffer}) => {
            done(renderedBuffer, this.adjustedTrimStart, this.adjustedTrimEnd);
        };

    }
}

export default AudioEffects;
