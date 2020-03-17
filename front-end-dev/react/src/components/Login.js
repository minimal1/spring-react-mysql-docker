/** @format */

import React from 'react';
import { login } from '../util/APIUtils';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants/index';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <section>
        <h1 className='page-title'>Login</h1>
        <AntWrappedLoginForm onLogin={this.props.onLogin} />
      </section>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = {
          result_code: 'OK',
          description: 'login_request',
          data: {
            id: values.username,
            pw: values.password
          }
        };
        console.log(loginRequest);
        login(loginRequest)
          .then(response => {
            console.log(response);
            localStorage.setItem(ACCESS_TOKEN, response.result_code);
            this.props.history.push('/login');
          })
          .catch(error => {
            if (error.result_code === 401) {
              notification.error({
                message: '졸업논문ing',
                description:
                  'Your Username or Password is incorrect. Please try again!'
              });
            } else {
              notification.error({
                message: '졸업논문ing',
                description:
                  error.description ||
                  'Sorry! Something went wrong. Please try again!'
              });
            }
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your Username' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              size='large'
              placeholder='Username'
              name='username'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              name='password'
              type='password'
              placeholder='Password'
              size='large'
            />
          )}
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
