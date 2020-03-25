/** @format */

import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import { Redirect, withRouter } from "react-router-dom";
import { changePassword } from "../util/APIUtils";
const FormItem = Form.Item;
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password: "",
    };
  }

  componentDidMount() {
    // this.props.loadCurrentUser();
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
      <main className='profile'>
        <h1 className='page-title'>Profile</h1>
        <Form onFinish={this.handleSubmit}>
          <Form.Item label='Student Number'>
            <span className='ant-form-text'>{student_number}</span>
          </Form.Item>
          <FormItem label='Email'>
            <span className='ant-form-text'>{email}</span>
          </FormItem>
          <FormItem label='Current Password'>
            <Input
              type='password'
              placeholder='Enter Current Password'
              name='oldPassword'
            />
          </FormItem>
          <FormItem label='New Password'>
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
      </main>
    );
  }
}

export default withRouter(Profile);
