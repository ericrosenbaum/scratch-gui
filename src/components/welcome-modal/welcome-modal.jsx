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
                        defaultMessage="Color Palette Exploration"
                        description="Color Palette Exploration"
                        id="gui.colorPaletteExploration.title"
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
                                    defaultMessage="Color Palette Exploration"
                                    description="Callout title"
                                    id="gui.welcomeModal.calloutTitle"
                                />
                            </div>
                            <div className={styles.calloutText}>
                                <FormattedMessage
                                    defaultMessage="Try a new way to pick colors
                                    in the Costume Editor"
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
                            defaultMessage="Where can I find it?"
                            description="Where can I find it?"
                            id="gui.colorPaletteExploration.whereCanIFindIt"
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
                                defaultMessage="Go to Costumes Tab"
                                description="Go to Costumes Tab"
                                id="gui.colorPaletteExploration.goToCostumesTab"
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
                                defaultMessage="Click on Fill or Outline"
                                description="Click on Fill or Outline"
                                id="gui.colorPaletteExploration.clickOnFillOrOutline"
                            />
                            <div
                                className={classNames(styles.instructionsImage, styles.instructionsImage2)}
                            />
                        </div>
                        <div
                            className={styles.instructionsStep}
                        >
                            <div className={styles.instructionsStepNumber}>
                                {3}
                            </div>
                            <FormattedMessage
                                defaultMessage="Try the new color palette"
                                description="Try the new color palette"
                                id="gui.colorPaletteExploration.tryTheNewColorPalette"
                            />
                            <div
                                className={classNames(styles.instructionsImage, styles.instructionsImage3)}
                            />
                        </div>
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
                                id="gui.colorPaletteExploration.questions"
                            />
                        </div>
                        <div className={styles.question}>
                            <FormattedMessage
                                defaultMessage="What is the Color Palette Exploration?"
                                description="What is the Color Palette Exploration?"
                                id="gui.colorPaletteExploration.question1"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="This is an experimental version of the Scratch editor,
                                where the Scratch Team is testing out a new way to choose paint colors."
                                description="answer 1"
                                id="gui.colorPaletteExploration.answer1"
                            />
                        </div>
                        <div className={styles.question}>
                            <FormattedMessage
                                defaultMessage="Why is Scratch Team doing this exploration?"
                                description="Why is Scratch Team doing this exploration?"
                                id="gui.colorPaletteExploration.question2"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="We hope this new way of picking colors makes it
                                easier to express your ideas. We’re sharing this work in progress
                                so we can get feedback to help us improve it."
                                description="answer 2"
                                id="gui.colorPaletteExploration.answer2"
                            />
                        </div>
                        <div className={styles.question}>
                            <FormattedMessage
                                defaultMessage="When will the new paint colors be on Scratch?"
                                description="When will the new paint colors be on Scratch?"
                                id="gui.colorPaletteExploration.question3"
                            />
                        </div>
                        <div className={styles.answer}>
                            <FormattedMessage
                                defaultMessage="We're still exploring, gathering
                                feedback, and revising this feature before we
                                decide if it might go into the main Scratch site."
                                description="answer 3"
                                id="gui.colorPaletteExploration.answer3"
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
                                id="gui.colorPaletteExploration.footerInfo"
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
                                    id="gui.colorPaletteExploration.learnMoreAboutScratch"
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
