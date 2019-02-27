import React, { Component } from 'react';
import axios from 'axios';
import LoadingBadge from './LoadingBadge';
import ModalBox from './ModalBox';
import { getSqlErrors } from '../utilities/Errors';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataServer: {
        authCode: ''
      },
      loadingText: '',
      boxModal: {
        isModal: false,
        message: '',
        color: ''
      }
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onAuthCode = this.onAuthCode.bind(this);

    // redirect page to manage list if already login.
    const { history } = this.props;
    if (localStorage.getItem('authToken')) {
      history.push('/managelist');
    }
  };

  onAuthCode() {

    const { history } = this.props;

    var auth = {
      email: 'umaqgeek@gmail.com',
      password: this.state.dataServer.authCode
    };

    axios.post('/api/loginApi', auth)
    .then(response => {
      localStorage.setItem('authToken', response.data.success.token);
      history.push('/managelist');
    })
    .catch(error => {
      console.log(error);
      this.setState({
        ...this.state,
        boxModal: {
          isModal: true,
          message: getSqlErrors(error.response.data.error),
          color: 'red'
        }
      });
    });
  };

  handleFieldChange (event) {
    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        [event.target.name]: event.target.value
      }
    })
  }

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
    };

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Login</div>
              <div className='card-body'>

                <ModalBox
                  open={this.state.boxModal.isModal}
                  message={this.state.boxModal.message}
                  color={this.state.boxModal.color}
                  onCloseModal={onCloseModal}
                />

                <label htmlFor='title'>Auth Code <span style={{color: 'red'}}>*</span></label>
                <input
                  id='authCode'
                  type='password'
                  className='form-control'
                  name='authCode'
                  value={this.state.dataServer.authCode}
                  onChange={this.handleFieldChange}
                  placeholder='Enter the auth code'
                />

              <br />

                <button type='button' className='btn btn-success' onClick={this.onAuthCode}>Enter</button>

              <br />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default LoginPage;
