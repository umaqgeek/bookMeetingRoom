import React, { Component } from 'react';
import LoadingBadge from './LoadingBadge';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataServer: {
        authCode: ''
      },
      loadingText: ''
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onAuthCode = this.onAuthCode.bind(this);
  };

  onAuthCode() {
    console.log(this.state.dataServer);
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
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Login</div>
              <div className='card-body'>

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
