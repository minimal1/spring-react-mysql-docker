/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";

import { register } from "../../util/APIUtils";

import {
  handleChangeForLoginAndRegister,
  isFormInvalid,
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../util/Handler";

const FormItem = Form.Item;

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: {
        value: "",
      },
      email: {
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
    //서버로 가입 양식 제출
    const registerRequest = {
      result_code: "OK",
      description: "register_request",
      data: {
        id: this.state.username.value,
        email: this.state.email.value,
        pw: this.state.password.value,
      },
    };

    register(registerRequest)
      .then((response) => {
        notification.success({
          message: "졸업논문ing",
          description:
            'Thank you! You"re successfully registered. Please Login to continue!',
        });
        this.props.history.push("/login");
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
      <main className='register'>
        <h1 className='register__title'>Create your account</h1>
        <Form onFinish={this.handleSubmit} className='form-container'>
          <FormItem
            hasFeedback
            validateStatus={this.state.username.validateStatus}
            help={this.state.username.errorMsg}
          >
            <Input
              className='id-input'
              size='large'
              name='username'
              autoComplete='off'
              placeholder='Your student ID'
              value={this.state.username.value}
              onChange={(event) => this.handleChange(event, validateUsername)}
            />
          </FormItem>
          <FormItem
            hasFeedback
            validateStatus={this.state.email.validateStatus}
            help={this.state.email.errorMsg}
          >
            <Input
              className='email-input'
              size='large'
              name='email'
              type='email'
              autoComplete='off'
              placeholder='Your email'
              value={this.state.email.value}
              onChange={(event) => this.handleChange(event, validateEmail)}
            />
          </FormItem>
          <FormItem
            hasFeedback
            validateStatus={this.state.password.validateStatus}
            help={this.state.password.errorMsg}
          >
            <Input
              className='pw-input'
              size='large'
              name='password'
              type='password'
              autoComplete='off'
              placeholder='A password between 6 to 20 characters'
              value={this.state.password.value}
              onChange={(event) => this.handleChange(event, validatePassword)}
            />
          </FormItem>
          <FormItem>
            <div className='form-container__submit-wrapper'>
              <Button
                className='register-form-button'
                type='primary'
                htmlType='submit'
                size='large'
                disabled={this.isFormInvalid("register")}
              >
                Register
              </Button>
              <span className='form-container__anchor-msg'>
                Already registed? <Link to='/login'>Login now!</Link>
              </span>
            </div>
          </FormItem>
        </Form>
      </main>
    );
  }
}

export default Register;
