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
    console.log(this.props);
  }

  handleLinkClick = (link) => {
    if (this.props.isAuthenticated) {
      window.open(link, "_blank").focus();
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <main className='main'>
        <InfiniteList
          query={this.props.query}
          onSearch={this.props.onSearch}
          onLinkClicked={this.handleLinkClick}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Loading onLoading={this.state.isLoading} />
      </main>
    );
  }
}

export default Container;
