/** @format */

import React, { Component } from "react";

import { Tabs, notification, Checkbox } from "antd";

import {
  searchPaper,
  deletePaper,
  deleteCheckedPaper,
} from "../../util/APIUtils";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPaper: [],
      allUser: [],
      checkedList: [],
      indeterminate: false,
      checkAll: false,
    };
  }

  componentDidMount() {
    this.updatePaper();
  }
  updatePaper = () => {
    const searchRequest = {
      result_code: "OK",
      description: "Search papers",
      data: {
        keyword: "",
        year: "",
        category: "",
        professor: "",
        hashtag: "",
      },
    };

    searchPaper(searchRequest)
      .then((response) => {
        this.setState({
          allPaper: response.data.searched_paper,
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

  onChangePaper = (checkedList) => {
    const { allPaper } = this.state;
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < allPaper.length,
      checkAll: checkedList.length === allPaper.length,
    });
  };

  onCheckAllPaperChange = (e) => {
    const { allPaper } = this.state;
    const checkedList = e.target.checked
      ? allPaper.map((aPaper) => aPaper.id)
      : [];

    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  onDeletePaper = (paperId) => {
    const deletePaperRequest = {
      result_code: "OK",
      description: "Request delete this paper",
      data: {
        paper_id: paperId,
      },
    };

    deletePaper(deletePaperRequest)
      .then((response) => {
        notification.success({
          message: "삭제 성공!",
          description: "You successfully deleted it.",
        });

        this.updatePaper();

        const { checkedList, allPaper } = this.state;
        const idx = checkedList.indexOf(paperId);
        if (idx > -1) {
          checkedList.splice(idx, 1);
          this.setState({
            checkedList: checkedList,
            indeterminate:
              !!checkedList.length && checkedList.length < allPaper.length,
            checkAll: allPaper.length && checkedList.length === allPaper.length,
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Delete Paper 실패",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  };

  onDeleteCheckedPaper = (e) => {
    e.preventDefault();

    const deleteCheckedPaperRequest = {
      result_code: "OK",
      description: "Request delete this paper",
      data: {
        paper_id: this.state.checkedList,
      },
    };

    deleteCheckedPaper(deleteCheckedPaperRequest)
      .then((response) => {
        console.log("good!!");

        this.setState({
          checkedList: [],
          indeterminate: false,
          checkAll: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { allPaper, allUser } = this.state;
    const paperList = allPaper.map((aPaper) => {
      return (
        <li className='paper-list__paper paper'>
          <Checkbox value={aPaper.id} />
          <span className='paper__category'>{aPaper.category}</span>
          <span className='paper__year'>{aPaper.year}</span>
          <span className='paper__professor'>{aPaper.professor}</span>
          <Link to={`/detail/${aPaper.id}`}>
            <span className='paper__title'>{aPaper.title}</span>
          </Link>
          <span className='paper__author'>{aPaper.student_number}</span>
          <div className='paper__column'>
            <Link className='link--edit-info' to={`/editPaper/${aPaper.id}`}>
              <button>
                <i className='far fa-edit'></i>
              </button>
            </Link>
            <button
              className='delete-paper'
              onClick={() => this.onDeletePaper(aPaper.id)}
            >
              <i className='far fa-trash-alt'></i>
            </button>
          </div>
        </li>
      );
    });

    const userList = allUser.map((aUser) => {});
    return (
      <main className='admin'>
        <h1 className='admin__title'>Admin page</h1>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Papers' key='1'>
            <div className='admin__row'>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllPaperChange}
                checked={this.state.checkAll}
              />
              <button
                className='delete-paper'
                onClick={this.onDeleteCheckedPaper}
              >
                <i className='far fa-trash-alt'></i>
              </button>
            </div>
            <CheckboxGroup
              style={{ display: "block" }}
              onChange={this.onChangePaper}
              value={this.state.checkedList}
            >
              <ul className='admin__list'>{paperList}</ul>
            </CheckboxGroup>
          </TabPane>
          <TabPane tab='Users' key='2'>
            <ul className='admin__list'>{userList}</ul>
          </TabPane>
        </Tabs>
      </main>
    );
  }
}

export default Admin;
