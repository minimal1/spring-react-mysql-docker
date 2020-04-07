/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";

import { login } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants/index";

const FormItem = Form.Item;

class Login extends React.Component {
  render() {
    return (
      <main className='login'>
        <h1 className='login__title'>Login</h1>

        <LoginForm onLogin={this.props.onLogin} />
      </main>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const loginRequest = {
      result_code: "OK",
      description: "login_request",
      data: {
        id: values.username,
        pw: values.password,
      },
    };

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
        this.props.onLogin();
      })
      .catch((error) => {
        notification.error({
          message: "졸업논문ing",
          description:
            error.description ||
            "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  render() {
    return (
      <Form onFinish={this.handleSubmit} className='login-form'>
        <FormItem
          name='username'
          rules={[{ required: true, message: "Please input your Username" }]}
        >
          <Input size='large' placeholder='Username' name='username' />
        </FormItem>
        <FormItem
          name='password'
          rules={[{ required: true, message: "Please input your Password" }]}
        >
          <Input
            name='password'
            type='password'
            placeholder='Password'
            size='large'
          />
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className='login-form-button'
          >
            Login
          </Button>
          Or <Link to='/register'>register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Login;
