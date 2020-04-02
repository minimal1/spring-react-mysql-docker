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
      all_paper: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    getAllPaper()
      .then((response) => {
        this.setState({
          all_paper: response.data.all_paper,
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
    return (
      <main className='main'>
        <InfiniteList allPaper={this.state.all_paper} />
        <Loading onLoading={this.state.isLoading} />
      </main>
    );
  }
}

export default Container;
