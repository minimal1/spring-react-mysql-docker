/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants/index';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {}

  render() {
    return (
      <header>
        <Link to='/' className='main-link img-link'>
          <img src='/imgs/icon-logo.JPEG' className='main-logo' />
        </Link>

        <form className='search-form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='search-keyword'
            placeholder='Search for papers'
          />

          <button className='search-button'>
            <img src='/imgs/icon-search.png' className='icon-search' />
          </button>
        </form>

        <nav>
          <ul className='nav-list'>
            <li className='list-item'>
              <Link to='/upload' className='nav-link'>
                Upload
              </Link>
            </li>
            <li className='list-item'>
              <Link to='/' className='nav-link'>
                About
              </Link>
            </li>

            <li className='list-item'>
              <Link to='/login' className='nav-link'>
                Log In
              </Link>
            </li>

            <li className='list-item'>
              <Link to='/register' className='nav-link'>
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
