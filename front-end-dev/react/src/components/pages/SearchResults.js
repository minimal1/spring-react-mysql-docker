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
      searched_paper: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.searching();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      match: {
        params: { query: prevQuery },
      },
    } = prevProps;

    const {
      match: {
        params: { query },
      },
    } = this.props;

    if (prevQuery !== query) {
      this.searching();
    }
  }
  searching = () => {
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
        this.setState({
          searched_paper: response.data.searched_paper,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });

        notification.error({
          message: "Paper 리스트 반환 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  };

  render() {
    const {
      match: {
        params: { query },
      },
    } = this.props;

    return (
      <main className='search'>
        <h4>Search : {query}</h4>
        <InfiniteList allPaper={this.state.searched_paper} />
        <Loading onLoading={this.state.isLoading} />
      </main>
    );
  }
}

export default SearchResults;
