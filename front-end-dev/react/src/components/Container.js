/** @format */

import React from "react";
import Title from "./Container/Title";
import InfiniteList from "./Container/InfiniteList";
import Loading from "./Container/Loading";
import { getAllPaper } from "../util/APIUtils";
import { notification } from "antd";

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
      <section>
        <InfiniteList allPaper={this.state.all_paper} />
        <Loading onLoading={this.state.isLoading} />
      </section>
    );
  }
}

export default Container;
