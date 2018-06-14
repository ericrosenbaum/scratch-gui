import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './connection-modal.css';

const ErrorStep = props => (
    <Box className={styles.body}>
        <Box className={styles.buttonRow}>
            <button
                className={styles.searchButton}
                onClick={props.onSearch}
            >
                <FormattedMessage
                    defaultMessage="error"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
            </button>
        </Box>
    </Box>
);

ErrorStep.propTypes = {
};

export default ErrorStep;
