/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants/index";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    this.props.onLogout();
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    return (
      <header>
        <Link to='/' className='main-link img-link'>
          <img src='/imgs/icon-logo.png' className='main-logo' />
        </Link>

        <form className='search-form' onSubmit={this.handleLogout}>
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
          {isAuthenticated ? (
            <ul className='nav-list'>
              <li className='list-item'>
                <Link to='/upload' className='nav-link'>
                  Upload
                </Link>
              </li>
              <li className='list-item'>
                <Link to='/profile' className='nav-link'>
                  Profile
                </Link>
              </li>
              <li className='list-item'>
                <a className='nav-link' onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className='nav-list'>
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
          )}
          {/* <li className='list-item'>
              <Link to='/' className='nav-link'>
                About
              </Link>
            </li> */}
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
