/** @format */

import React, { Component } from "react";
import { notification } from "antd";
import { Link } from "react-router-dom";

import { getPaperDetail } from "../../util/APIUtils";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    const {
      match: {
        params: { itemid: itemId },
      },
    } = props;

    this.state = {
      itemId: itemId,
      title: "",
      keyName: "",
      year: "",
      github: "",
      category: "",
      professor: "",
      description1: "",
      description2: "",
      description3: "",
      studentNumber: "",
    };
  }

  componentDidMount() {
    const detailRequest = {
      result_code: "OK",
      description: "detail_paper",
      data: {
        paper_id: this.state.itemId,
      },
    };

    getPaperDetail(detailRequest)
      .then((response) => {
        this.setState({
          title: response.data.title,
          keyName: response.data.key_name,
          year: response.data.year,
          github: response.data.github,
          category: response.data.category,
          professor: response.data.professor,
          description1: response.data.description1,
          description2: response.data.description2,
          description3: response.data.description3,
          studentNumber: response.data.student_number,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Paper Detail 반환 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  }
  render() {
    const linkList =
      this.props.currentUser.student_number === this.state.studentNumber ? (
        <li className='paper-detail__link'>
          <Link
            className='link--edit-paper'
            to={`/editPaper/${this.state.itemId}`}
          >
            <button>Edit paper</button>
          </Link>
        </li>
      ) : undefined;

    return (
      <main className='paper-detail'>
        <div className='paper-detail__row'>
          <h1 className='paper-detail__title--paper'>{this.state.title}</h1>
          <div className='paper-detail__wrapper--row'>
            <ul className='paper-detail__info-list'>
              <li className='paper-detail__info'>
                <Link to={"/result/" + this.state.year}>{this.state.year}</Link>
              </li>
              <li className='paper-detail__info'>|</li>
              <li className='paper-detail__info'>
                <Link to={"/result/" + this.state.category}>
                  {this.state.category}
                </Link>
              </li>
              <li className='paper-detail__info'>|</li>
              <li className='paper-detail__info'>
                <Link to={"/result/" + this.state.professor}>
                  {this.state.professor}
                </Link>
              </li>
            </ul>
            <ul className='paper-detail__links'>
              <li className='paper-detail__link'>
                <a
                  className='link--paper'
                  href={`https://gradubucket.s3.ap-northeast-2.amazonaws.com/${this.state.keyName}`}
                  target='_blank'
                >
                  <button>
                    <i className='far fa-file-alt'></i> Paper
                  </button>
                </a>
              </li>
              <li className='paper-detail__link'>
                <a
                  className='link--github'
                  href={`https://${this.state.github}`}
                  target='_blank'
                >
                  <button>
                    <i className='fab fa-github'></i> Github
                  </button>
                </a>
              </li>
              {linkList}
            </ul>
          </div>
        </div>
        <div className='paper-detail__row'>
          <h1 className='paper-detail__title--row'>Top 3 Main Points</h1>
          <ul className='paper-detail__desc-list'>
            <li className='paper-detail__desc'>{this.state.description1}</li>
            <li className='paper-detail__desc'>{this.state.description2}</li>
            <li className='paper-detail__desc'>{this.state.description3}</li>
          </ul>
        </div>
        <div className='paper-detail__row'>
          <h1 className='paper-detail__title--row'>Result</h1>
        </div>
      </main>
    );
  }
}

export default ItemDetail;
