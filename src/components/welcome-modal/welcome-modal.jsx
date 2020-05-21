import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import surpriseIcon from './icon--surprise.svg';
import scratchLabLogo from './scratch-lab-logo.svg';
import calloutImage from './callout-image.png';
import scratchLogo from './scratch-logo.svg';

import champDanceThumbnail from './champ-dance-thumbnail.png';
import singToFishThumbnail from './sing-to-fish-thumbnail.png';

import styles from './welcome-modal.css';

const WelcomeModalComponent = props => (
    <ReactModal
        isOpen
        className={classNames(styles.modalContent, styles.fullScreen)}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onClose}
    >
        <Box
            dir={props.isRtl ? 'rtl' : 'ltr'}
            direction="column"
            grow={1}
        >
            {/* TITLE BAR */}

            <div className={classNames(styles.header)}>
                <div
                    className={classNames(
                        styles.headerItem,
                        styles.headerItemTitle
                    )}
                >
                    <FormattedMessage
                        defaultMessage="Sound Sensing Extension"
                        description="Sound Sensing Extension"
                        id="gui.soundSensing.title"
                    />
                </div>
                <div
                    className={classNames(
                        styles.headerItem,
                        styles.headerItemClose
                    )}
                >
                    <Button
                        className={styles.backButton}
                        iconSrc={surpriseIcon}
                        onClick={props.onClose}
                    >
                        <FormattedMessage
                            defaultMessage="Try it out"
                            description="Try it out button in modal"
                            id="gui.welcomeModal.tryIt"
                        />
                    </Button>
                </div>
            </div>

            {/* MASTHEAD / JUICE BAR */}

            <Box
                className={styles.masthead}
            >
                <div className={styles.flexRow}>
                    <img
                        className={styles.scratchLabLogo}
                        src={scratchLabLogo}
                    />
                </div>
                <div
                    className={classNames(styles.flexRow, styles.mastheadText)}
                >
                    <div className={styles.mastheadInner}>
                        <FormattedMessage
                            defaultMessage="Try out experimental features that the
                            Scratch Team is exploring."
                            description="description of Scratch Lab"
                            id="gui.welcomeModal.descriptionOfScratchLab"
                        />
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <div className={classNames(styles.mastheadCallout, styles.bleb, styles.flexRow)}>
                        <div className={styles.calloutInfo}>
                            <div className={styles.calloutTitle}>
                                <FormattedMessage
                                    defaultMessage="Sound Sensing Extension"
                                    description="Callout title"
                                    id="gui.welcomeModal.calloutTitle"
                                />
                            </div>
                            <div className={styles.calloutText}>
                                <FormattedMessage
                                    defaultMessage="Sense loudness from your microphone or your project"
                                    description="Callout text"
                                    id="gui.welcomeModal.calloutText"
                                />
                            </div>
                            <div>
                                <button
                                    className={styles.tryItButton}
                                    onClick={props.onClose}
                                >
                                    <img
                                        src={surpriseIcon}
                                        className={styles.tryItButtonIcon}
                                    />
                                    <div>
                                        <FormattedMessage
                                            defaultMessage="Try it out"
                                            description="Try it out button in modal"
                                            id="gui.welcomeModal.tryIt"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className={styles.calloutImageContainer}>
                            <img
                                className={styles.calloutImage}
                                src={calloutImage}
                            />
                        </div>
                    </div>
                </div>
            </Box>

            { /* INSTRUCTION STEPS */}

            <div
                className={styles.flexRow}
            >
                <div
                    className={styles.instructionsInner}
                >
                    <div
                        className={styles.instructionsTitle}
                    >
                        <FormattedMessage
                            defaultMessage="Things to Try"
                            description="Things to Try"
                            id="gui.soundSensingExtension.thingsToTry"
                        />
                    </div>
                    <div
                        className={classNames(styles.instructionsSteps, styles.flexRow)}
                    >
                        <div
                            className={styles.instructionsStep}
                        >
                            <div className={styles.instructionsStepNumber}>
                                {1}
                            </div>
                            <FormattedMessage
                                defaultMessage="Show loudness as a number"
                                description=""
                                id="gui.soundSensingExtension.goToCostumesTab"
                            />
                            <div
                                className={classNames(styles.instructionsImage, styles.instructionsImage1)}
                            />
                        </div>
                        <div
                            className={styles.instructionsStep}
                        >
                            <div className={styles.instructionsStepNumber}>
                                {2}
                            </div>
                            <FormattedMessage
                                defaultMessage="Trigger animation with sounds"
                                description=""
                                id="gui.soundSensingExtension.clickOnFillOrOutline"
                            />
                            <div
                                className={classNames(styles.instructionsImage, styles.instructionsImage2)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            { /* STARTER PROJECTS */}

            <div
                className={styles.flexRow}
            >
                <div
                    className={styles.starterProjectsInner}
                >
                    <div
                        className={styles.instructionsTitle}
                    >
                        <FormattedMessage
                            defaultMessage="Starter Projects"
                            description="Starter Projects"
                            id="gui.soundSensingExtension.starterProjects"
                        />
                    </div>
                    <div className={styles.projectCards}>
                        <a
                            className={styles.projectCard}
                            href={'?starterProject=https://ericrosenbaum.github.io/scratch-gui/sound-sensing/static/sb3/sound-sensing-sing-to-fish.sb3'}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <div>
                                <img
                                    className={styles.projectCardImage}
                                    src={singToFishThumbnail}
                                />
                            </div>
                            <div className={styles.projectCardInfo}>
                                <p className={styles.projectCardTitle}>{'Sing to these Fish'}</p>
                                <p className={styles.projectCardInfoP}>
                                    {'Sing into your mic to animate these fish'}
                                </p>
                            </div>
                        </a>

                        <a
                            className={styles.projectCard}
                            href={'?starterProject=https://ericrosenbaum.github.io/scratch-gui/sound-sensing/static/sb3/sound-sensing-champ-dance.sb3'}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <div>
                                <img
                                    className={styles.projectCardImage}
                                    src={champDanceThumbnail}
                                />
                            </div>
                            <div className={styles.projectCardInfo}>
                                <p className={styles.projectCardTitle}>{'Dance Party'}</p>
                                <p className={styles.projectCardInfoP}>
                                    {'Animate in time with the music using the project loudness block'}
                                </p>
                            </div>
                        </a>

                        <a
                            className={styles.projectCard}
                            href={'?starterProject=https://ericrosenbaum.github.io/scratch-gui/sound-sensing/static/sb3/sound-sensing-champ-dance.sb3'}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <div>
                                <img
                                    className={styles.projectCardImage}
                                    src={champDanceThumbnail}
                                />
                            </div>
                            <div className={styles.projectCardInfo}>
                                <p className={styles.projectCardTitle}>{'Dance Party'}</p>
                                <p className={styles.projectCardInfoP}>
                                    {'Animate in time with the music using the project loudness block'}
                                </p>
                            </div>
                        </a>

                    </div>
                </div>
            </div>


            { /* QUESTIONS */}

            <div
                className={styles.flexRow}
            >
                <div
                    className={styles.questions}
                >
                    <div
                        className={styles.questionsInner}
                    >
                        <div
                            className={styles.questionsTitle}
                        >
                            <FormattedMessage
                                defaultMessage="Questions"
                                description="Questions"
                                id="gui.soundSensingExtension.questions"
                            />
                        </div>
                        <div className={styles.question}>
                            <FormattedMessage
                                defaultMessage="What is the Sound Sensing extension?"
                                description="What is the Sound Sensing extension?"
                                id="gui.soundSensingExtension.question1"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="This is an experimental version of the Scratch editor,
                                where the Scratch Team is testing out a new extension. The Sound Sensing
                                extension adds new blocks to Scratch that let you sense sound, so you can
                                interact with your projects in new ways: sing to make your sprite dance,
                                use music to control animation, or whatever else you can imagine."
                                description="answer 1"
                                id="gui.soundSensingExtension.answer1"
                            />
                        </div>
                        <div className={styles.question}>
                            <FormattedMessage
                                defaultMessage="What are the &quot;microphone loudness&quot; and &quot;project loudness&quot; blocks?"
                                description="What are microphone loudness and project loudness?"
                                id="gui.soundSensingExtension.question2"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="The microphone loudness block reports a number from 0 to 100 representing
                                the loudness of the sound being currently received by the microphone connected to your
                                computer. It replaces the existing loudness block in the sensing category."
                                description="answer 2"
                                id="gui.soundSensingExtension.answer2"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="The project loudness block reports a number from 0 to 100 representing
                                the loudness of the sounds being played by scratch. It includes sounds played using the
                                play sound blocks, the music extension and the text to speech extension."
                                description="answer 2a"
                                id="gui.soundSensingExtension.answer2a"
                            />
                        </div>
                        <div className={styles.question}>
                            <FormattedMessage
                                defaultMessage="When will the Sound Sensing extension be on Scratch?"
                                description="When will the Sound Sensing extension be on Scratch?"
                                id="gui.soundSensingExtension.question3"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="We're still exploring, gathering
                                feedback, and revising this extension before we
                                decide if it might go into the main Scratch site."
                                description="answer 2"
                                id="gui.soundSensingExtension.answer3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            { /* FOOTER */}

            <div
                className={classNames(styles.footer, styles.flexRow)}
            >
                <div className={classNames(styles.footerInner, styles.flexRow)}>
                    <img
                        className={styles.scratchLogo}
                        src={scratchLogo}
                    />
                    <div className={styles.divider} />
                    <div className={styles.footerTextArea}>
                        <div className={styles.footerText}>
                            <FormattedMessage
                                defaultMessage="Scratch Lab is a place for the Scratch Team to
                                explore, share, and gather feedback on new features for Scratch."
                                description="Footer info"
                                id="gui.soundSensingExtension.footerInfo"
                            />
                        </div>
                        <div className={styles.footerLink}>
                            <a
                                href="https://scratch.mit.edu/about"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <FormattedMessage
                                    defaultMessage="Learn more about Scratch"
                                    description="Learn more about Scratch"
                                    id="gui.soundSensingExtension.learnMoreAboutScratch"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </Box>
    </ReactModal>
);

WelcomeModalComponent.propTypes = {
    isRtl: PropTypes.bool,
    onClose: PropTypes.func
};

export default WelcomeModalComponent;
