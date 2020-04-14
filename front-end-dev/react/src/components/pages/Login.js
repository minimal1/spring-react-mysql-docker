/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";

import { login } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants/index";

import {
  handleChangeForLoginAndRegister,
  isFormInvalid,
  validateUsername,
  validatePassword,
} from "../../util/Handler";

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

    this.state = {
      username: {
        value: "",
      },
      password: {
        value: "",
      },
    };

    this.handleChange = handleChangeForLoginAndRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormInvalid = isFormInvalid.bind(this);
  }

  handleSubmit(values) {
    const loginRequest = {
      result_code: "OK",
      description: "login_request",
      data: {
        id: this.state.username.value,
        pw: this.state.password.value,
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
    const { username, password } = this.state;
    return (
      <Form onFinish={this.handleSubmit} className='form-container'>
        <FormItem
          hasFeedback
          validateStatus={username.validateStatus}
          help={username.errorMsg}
        >
          <Input
            size='large'
            placeholder='Username'
            name='username'
            value={username.value}
            onChange={(event) => this.handleChange(event, validateUsername)}
          />
        </FormItem>
        <FormItem
          hasFeedback
          validateStatus={password.validateStatus}
          help={password.errorMsg}
        >
          <Input
            name='password'
            type='password'
            placeholder='Password'
            size='large'
            value={password.value}
            onChange={(event) => this.handleChange(event, validatePassword)}
          />
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className='login-form-button'
            disabled={this.isFormInvalid("login")}
          >
            Login
          </Button>
          <span className='form-container__anchor-msg'>
            Or <Link to='/register'>register now!</Link>
          </span>
        </FormItem>
      </Form>
    );
  }
}

export default Login;
