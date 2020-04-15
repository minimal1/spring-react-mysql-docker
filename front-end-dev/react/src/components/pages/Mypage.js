/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";

import InfiniteList from "../partials/InfiniteList";
class Mypage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_paper: [],
      isLoading: false,
    };
  }

  render() {
    return (
      <main className='mypage'>
        <div className='mypage__title-wrapper'>
          <h1 className='mypage__title'>My page</h1>
          <Link className='link--edit-info' to={`/changePassword`}>
            <button>Change Password</button>
          </Link>
        </div>
        <InfiniteList isInMypage={true} />
      </main>
    );
  }
}

export default Mypage;
