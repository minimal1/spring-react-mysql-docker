/** @format */

import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import { changePassword, getMyPaper } from "../util/APIUtils";
import InfiniteList from "./Container/InfiniteList";
const FormItem = Form.Item;
class Mypage extends Component {
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

    getMyPaper()
      .then((response) => {
        this.setState({
          all_paper:
            response.data.my_paper === undefined ? [] : response.data.my_paper,
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
    const {
      currentUser: { student_number, email },
    } = this.props;

    return (
      <main className='mypage'>
        <h1 className='page-title'>My page</h1>
        <Form onFinish={this.handleSubmit}>
          <Form.Item label='Student Number'>
            <span className='ant-form-text'>{student_number}</span>
          </Form.Item>
          <FormItem label='Email'>
            <span className='ant-form-text'>{email}</span>
          </FormItem>
          <FormItem name='old_password' label='Current Password'>
            <Input
              type='password'
              placeholder='Enter Current Password'
              name='oldPassword'
            />
          </FormItem>
          <FormItem name='new_password' label='New Password'>
            <Input
              type='password'
              placeholder='Enter New Password'
              name='newPassword'
            />
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' style={{ marginTop: 16 }}>
              Submit
            </Button>
          </FormItem>
        </Form>

        <h1 className='page-title'>My List</h1>
        <InfiniteList allPaper={this.state.all_paper} />
      </main>
    );
  }
}

export default Mypage;
