import SuperpoweredModule from './superpowered.js'

var Superpowered = null;

class Analyzer extends SuperpoweredModule.AudioWorkletProcessor {
    // runs after the constructor
    onReady () {
        Superpowered = this.Superpowered;

        this.analyzer = Superpowered.new('Analyzer',
            Superpowered.samplerate,
            60
        );

        console.log('MyProcessor onReady');

        this.sendMessageToMainScope({
            someText: "actually ready"
        });
    }

    onMessageFromMainScope (message) {
        if (typeof message.analyzer !== 'undefined') {
            this.analyzer.makeResults(
                60, // Detected bpm will be more than or equal to this. Recommended value: 60.
                200, // Detected bpm will be less than or equal to this. Recommended value: 200.
                0, // If you know the bpm set it here. Use 0 otherwise.
                0, // Provides a "hint" for the analyzer with this. Use 0 otherwise.
                true, // True: calculate beatgridStartMs. False: save some CPU with not calculating it.
                0, // Provides a "hint" for the analyzer with this. Use 0 otherwise.
                false, // True: make overviewWaveform. False: save some CPU and memory with not making it.
                false, // True: make the low/mid/high waveforms. False: save some CPU and memory with not making them.
                true // True: calculate keyIndex. False: save some CPU with not calculating it.
            );
            this.sendMessageToMainScope({
                bpm: this.analyzer.bpm,
                peakDb: this.analyzer.peakDb,
                beatgridStartMs: this.analyzer.beatgridStartMs,
                keyIndex: this.analyzer.keyIndex
            });
        }
    }

    processAudio (inputBuffer, outputBuffer, buffersize, parameters) {
        this.analyzer.process(
            inputBuffer.pointer, // Pointer to floating point numbers. 32-bit interleaved stereo input.
            128, // Number of frames to process.
            -1 // If this value is not -1, this method can NOT be used in a real-time audio thread.
        );
        return true;
    }
}

if (typeof AudioWorkletProcessor === 'function') registerProcessor('Analyzer', Analyzer);
export default Analyzer;
