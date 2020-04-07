/** @format */

import React from "react";
import { notification } from "antd";

import InfiniteList from "./partials/InfiniteList";
import Loading from "./partials/Loading";
import { getAllPaper } from "../util/APIUtils";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <main className='main'>
        <InfiniteList />
        <Loading onLoading={this.state.isLoading} />
      </main>
    );
  }
}

export default Container;
