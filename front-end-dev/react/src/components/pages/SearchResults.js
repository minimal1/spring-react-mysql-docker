/** @format */

import React from "react";

import ResultItem from "../ResultItem";
import InfiniteList from "../Container/InfiniteList";
import Loading from "../Container/Loading";
import { notification } from "antd";
import { searchPaper } from "../../util/APIUtils";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searched_list: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const {
      match: {
        params: { query },
      },
    } = this.props;

    const searchRequest = {
      result_code: "OK",
      description: "Search papers",
      data: {
        query: query,
      },
    };

    searchPaper(searchRequest)
      .then((response) => {
        console.log(response);
        this.setState({
          searched_list: response.data.searched_list,
          isLoading: false,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Paper 리스트 반환 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  render() {
    const {
      match: {
        params: { query },
      },
    } = this.props;
    return (
      <section>
        <h4>Search : {query}</h4>
        <InfiniteList allPaper={this.state.searched_list} />
        <Loading onLoading={this.state.isLoading} />
      </section>
    );
  }
}

export default SearchResults;
