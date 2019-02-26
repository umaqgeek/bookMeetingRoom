import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MenuBar extends Component {
  render() {
    return (
          <div className='container col-md-5'>
            <div className='card'>
              <div className='card-body'>

                <Link to='/'>
                  <button className='btn btn-success'>Home</button>
                </Link>
                <span> </span>
                <Link to='/loginpage'>
                  <button className='btn btn-primary'>Manage</button>
                </Link>

              </div>
            </div>
          </div>
    );
  };
};

export default MenuBar;
