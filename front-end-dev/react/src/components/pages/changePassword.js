/** @format */

import React, { Component } from "react";

class changePassword extends Component {
  render() {
    return (
      <Form onFinish={this.handleSubmit} className='form-container'>
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
    );
  }
}

export default changePassword;
