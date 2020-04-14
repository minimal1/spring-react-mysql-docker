/** @format */

import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";

import { changePassword } from "../../util/APIUtils";
import InfiniteList from "../partials/InfiniteList";
const FormItem = Form.Item;
class Mypage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_paper: [],
      isLoading: false,
    };
  }
  handleSubmit = (values) => {
    const {
      currentUser: { student_number, email },
    } = this.props;

    const changePasswordRequest = {
      result_code: "OK",
      description: "changePassword_Request",
      data: {
        student_number,
        email,
        old_password: values.old_password,
        new_password: values.new_password,
      },
    };

    changePassword(changePasswordRequest)
      .then((response) => {
        notification.success({
          message: "졸업작품ing",
          description: "Your passowrd is successfully changed.",
        });

        this.props.history.push("/");
      })
      .catch((error) => {
        notification.error({
          message: "졸업논문ing",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  };

  render() {
    return (
      <main className='mypage'>
        <div className='mypage__title-wrapper'>
          <h1 className='mypage__title'>My page</h1>
          <Link className='link--edit-info' to={`/changePassword`}>
            <button>Change Password</button>
          </Link>
        </div>
        <InfiniteList isInMypage={true} />
      </main>
    );
  }
}

export default Mypage;
