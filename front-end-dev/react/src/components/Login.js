/** @format */

import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      pw: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    //서버로 가입 양식 제출
    e.preventDefault();
    const { id, pw } = this.state;

    const login_request = {
      result_code: 'OK',
      description: 'login_request',
      data: {
        id: this.state.id,
        pw: this.state.pw
      }
    };

    const loginrequest_info = {
      method: 'POST',
      body: JSON.stringify(login_request),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (id && pw) {
      fetch('http://127.0.0.1:8080/login', loginrequest_info)
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.result_code === 'OK') {
            alert(
              `Login successed, id = ${json.data.id}, pw = ${json.data.pw}`
            );
          } else {
            alert(`Login failed ${json.description}`);
          }
        })
        .then(this.props.history.push('/'));
    } else {
      alert('입력값을 확인해주세요');
    }
  }

  render() {
    return (
      <section>
        <h1 className='login-title'>Login</h1>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <label>Student ID</label>
          <input
            type='text'
            className='id-input'
            name='id'
            value={this.state.id}
            onChange={this.handleChange}
          />

          <label>Password</label>
          <input
            type='text'
            className='pw-input'
            name='pw'
            value={this.state.pw}
            onChange={this.handleChange}
          />
          <button className='text-button'>Login</button>
        </form>
      </section>
    );
  }
}

export default Login;
