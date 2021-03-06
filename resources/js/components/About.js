import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='col-md-4 card card-header mt-3'>About</div>
        <div className='col-md-4 card card-body'>
          <center className='py-1'>

            <div className='mb-5' style={{fontSize: '16px'}}>
              This system is used by students society in University Teknikal Malaysia
              Melaka (UTeM) to book and manage meeting rooms at
              the building of Student Activity Centre. Currently, it is managed by the current Majlis Perwakilan Pelajar (MPP).
            </div>

            <br />

            <div className='mb-1' style={{fontStyle: 'italic'}}>
              Develop by Umar Mukhtar <br />
              <a href='http://tuffah.info' target='_blank'>Tuffah Informatics</a> <br />
              <a href='https://www.facebook.com/kidzeclipes' target='_blank'>umaqgeek@gmail.com</a> <br />
              Version 1.0.7, 2019
            </div>

            <Link to='/'>
              <button type='button' className='btn btn-success mt-4'>Go to Home</button>
            </Link>
          </center>
        </div>
      </div>
    );
  };
};

export default LoginPage;
