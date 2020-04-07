/** @format */

import React from "react";
import { notification } from "antd";

import InfiniteList from "../partials/InfiniteList";
import Loading from "../partials/Loading";
import { searchPaper } from "../../util/APIUtils";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }
  render() {
    const {
      match: {
        params: { query },
      },
    } = this.props;

    return (
      <main className='search'>
        <h4 className='search__title'>Search : {query}</h4>
        <InfiniteList query={query} />
        <Loading onLoading={this.state.isLoading} />
      </main>
    );
  }
}

export default SearchResults;
