import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import WelcomeModalComponent from '../components/welcome-modal/welcome-modal.jsx';

import {
    closeWelcomeModal
} from '../reducers/modals';

class WelcomeModal extends React.Component {
    render () {
        return (
            <WelcomeModalComponent
                onClose={this.props.onClose}
            />
        );
    }
}

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
