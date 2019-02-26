import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class ModalBox extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onCloseModal}
        center
      >
        <div className='container py-4' style={{width: '300px'}}>
          <center>
            <h4 style={{color: this.props.color}}>{this.props.message}</h4>
          </center>
        </div>
      </Modal>
    );
  };
};

export default ModalBox;
