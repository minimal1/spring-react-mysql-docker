/** @format */

import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants/index";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
    };
  }

  handleChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      searchQuery: value,
    });
  };

  handleLogout = (e) => {
    this.props.onLogout();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const query = this.state.searchQuery;
    console.log(query);
    this.props.history.push(`/result/${query}`);
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <header>
        <Link to='/' className='main-link img-link'>
          <img src='/imgs/icon-logo.png' className='main-logo' />
        </Link>

        <form className='search-form'>
          <input
            type='text'
            className='search-keyword'
            placeholder='Search for papers'
            onChange={this.handleChange}
            value={this.searchQuery}
          />

          <button className='search-button' onClick={this.handleSubmit}>
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
                <Link to='/mypage' className='nav-link'>
                  Mypage
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
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
