/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";

import { register } from "../../util/APIUtils";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../../constants/index";

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(
      this
    );
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  handleChange(e, validationFunc) {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFunc(inputValue),
      },
    });
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

  isFormInvalid() {
    return !(
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  render() {
    return (
      <main className='register'>
        <h1 className='page-title'>Create your account</h1>
        <Form onFinish={this.handleSubmit} className='register-form'>
          <FormItem
            hasFeedback
            validateStatus={this.state.username.validateStatus}
            help={this.state.username.errorMsg}
          >
            <Input
              // className='id-input'
              size='large'
              name='username'
              autoComplete='off'
              placeholder='Your student ID'
              value={this.state.username.value}
              onBlur={this.validateUsernameAvailability}
              onChange={(event) =>
                this.handleChange(event, this.validateUsername)
              }
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
              onBlur={this.validateEmailAvailability}
              onChange={(event) => this.handleChange(event, this.validateEmail)}
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
              onChange={(event) =>
                this.handleChange(event, this.validatePassword)
              }
            />
          </FormItem>
          <FormItem>
            <Button
              className='register-form-button'
              type='primary'
              htmlType='submit'
              size='large'
              disabled={this.isFormInvalid()}
            >
              Register
            </Button>
            Already registed? <Link to='/login'>Login now!</Link>
          </FormItem>
        </Form>
      </main>
    );
  }

  validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`,
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters needed.)`,
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null,
      };
    }
  };

  validateEmail = (email) => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Email may not be empty",
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");

    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email not valid",
      };
    }

    return { validateStatus: null, errorMsg: null };
  };

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Password is too shart (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === "error") {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation,
        },
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: "success",
        errorMsg: null,
      },
    });
  }

  validateEmailAvailability() {
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if (emailValidation.validateStatus === "error") {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation,
        },
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: "success",
        errorMsg: null,
      },
    });
  }
}

export default Register;
