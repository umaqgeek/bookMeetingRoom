import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MenuBar extends Component {

  render() {

    var loggedInButtons;
    if (localStorage.getItem('authToken')) {
      loggedInButtons = (
        <span>
          <Link to='/logoutpage'>
            <button className='btn btn-danger'>Logout</button>
          </Link>
        </span>
      );
    } else {
      loggedInButtons = (
        <span>
          <Link to='/'>
            <button className='btn btn-success'>Home</button>
          </Link>
          <span className='mr-2'></span>
          <Link to='/loginpage'>
            <button className='btn btn-primary'>Manage</button>
          </Link>
          <span className='mr-2'></span>
          <Link to='/about'>
            <button className='btn btn-secondary'>About</button>
          </Link>
        </span>
      );
    }

    return (
          <div className='container col-md-5 mt-5'>
            <div className='card'>
              <div className='card-body'>

                {loggedInButtons}

              </div>
            </div>
          </div>
    );
  };
};

export default MenuBar;
