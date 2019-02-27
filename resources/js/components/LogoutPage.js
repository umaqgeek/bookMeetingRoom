import React, { Component } from 'react';
import axios from 'axios';
import LoadingBadge from './LoadingBadge';
import ModalBox from './ModalBox';
import { getSqlErrors } from '../utilities/Errors';

class LogoutPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingText: '',
      boxModal: {
        isModal: true,
        message: 'You have logout',
        color: 'green'
      }
    };

    localStorage.removeItem('authToken');
  };

  render() {

    let onCloseModal = () => {
      this.setState({
        ...this.state,
        boxModal: {
          isModal: false,
          message: '',
          color: ''
        }
      });

      const { history } = this.props;
      history.push('/loginpage');
    };

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>

                <ModalBox
                  open={this.state.boxModal.isModal}
                  message={this.state.boxModal.message}
                  color={this.state.boxModal.color}
                  onCloseModal={onCloseModal}
                />

              <br />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default LogoutPage;
