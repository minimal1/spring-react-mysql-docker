/** @format */

import React from "react";
import Item from "./Item";
import {
  likePaper,
  getAllPaper,
  searchPaper,
  getMyPaper,
} from "../../util/APIUtils";
import { notification } from "antd";

class InfiniteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPaper: [],
      likedPaper: [],
    };
  }

  componentDidMount() {
    this.updatePaper();
  }

  componentDidUpdate(prevProps, prevState, snapshots) {
    if (prevProps.query !== this.props.query) {
      this.updatePaper();
    }
  }

  updatePaper = () => {
    const query = this.props.query;

    if (query === "" || query === undefined || query === null) {
      if (this.props.isInMypage) {
        getMyPaper()
          .then((response) => {
            this.setState({
              allPaper: response.data.my_paper,
              likedPaper: response.data.liked_paper,
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
      } else {
        getAllPaper()
          .then((response) => {
            this.setState({
              allPaper: response.data.all_paper,
              likedPaper: response.data.liked_paper,
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
    } else if (query !== undefined && query !== null) {
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
            allPaper: response.data.searched_paper,
            likedPaper: response.data.liked_paper,
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
    }
  };

  handleLike = (paper_id, liked) => {
    if (!this.props.isAuthenticated) {
      return;
    }
    const likePaperRequest = {
      result_code: "OK",
      description: "Request like paper",
      data: {
        paper_id,
        like_or_not: liked ? 1 : 0,
      },
    };

    likePaper(likePaperRequest)
      .then((response) => {
        console.log(response);
        this.updatePaper();
      })
      .catch((error) => {
        notification.error({
          message: "Like 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  };

  render() {
    const paperList = this.state.allPaper;
    const likedPaper = this.state.likedPaper;

    let paperLi = undefined;

    if (paperList !== undefined) {
      paperLi = paperList.map((p) => {
        let liked = false;

        if (likedPaper !== undefined && likedPaper !== null) {
          liked = likedPaper.includes("" + p.id);
        }

        return (
          <Item
            key={p.id}
            id={p.id}
            thumbnail={p.thumbnail}
            title={p.title}
            keyName={p.key_name}
            github={p.github}
            hashtag={p.hashtag}
            views={p.view_count}
            likes={p.like_count}
            liked={liked}
            onLiked={this.handleLike}
            onSearch={this.props.onSearch}
            isAuthenticated={this.props.isAuthenticated}
            onLinkClicked={this.props.onLinkClicked}
          />
        );
      });
    }
    return <ul className='item-list'>{paperLi}</ul>;
  }
}

export default InfiniteList;
