import React from 'react';
import Modal from '../../containers/modal.jsx';

class WelcomeModalComponent extends React.Component {
    render () {
        return (
            <Modal
                fullScreen
            >
                <div>{'hi'}</div>
            </Modal>
        );
    }
}

export default WelcomeModalComponent;
