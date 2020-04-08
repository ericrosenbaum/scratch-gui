import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import surpriseIcon from './icon--surprise.svg';
import scratchLabLogo from './scratch-lab-logo.svg';
import bleb from './bleb.svg';

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
                            defaultMessage="A place for the Scratch Team to explore,
                                share, and gather feedback on new features for Scratch."
                            description="description of Scratch Lab"
                            id="gui.welcomeModal.descriptionOfScratchLab"
                        />
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <div className={classNames(styles.mastheadCallout, styles.flexRow)}>
                        <div className={styles.calloutInfo}>
                            <div className={styles.calloutText}>
                                <FormattedMessage
                                    defaultMessage="Try a new way to pick colors in the Costume Editor"
                                    description="Color palette callout info"
                                    id="gui.welcomeModal.colorPaletteCalloutInfo"
                                />
                            </div>
                            <div>
                                <Button
                                    className={styles.tryItButton}
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
                        <div className={styles.bleb}>

                        </div>
                    </div>
                </div>
            </Box>

        </Box>
    </ReactModal>
);

WelcomeModalComponent.propTypes = {
    isRtl: PropTypes.bool,
    onClose: PropTypes.func
};

export default WelcomeModalComponent;
