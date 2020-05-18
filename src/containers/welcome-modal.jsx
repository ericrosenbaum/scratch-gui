import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import WelcomeModalComponent from '../components/welcome-modal/welcome-modal.jsx';

import {
    closeWelcomeModal
} from '../reducers/modals';

/* eslint-disable react/display-name */
const WelcomeModal = props => (
    <WelcomeModalComponent
        onClose={props.onClose}
    />
);

WelcomeModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeWelcomeModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeModal);
