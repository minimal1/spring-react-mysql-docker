import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            email: "",
            pw: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target

        this.setState({
            [name]: value, 
        })
    }

    handleSubmit(e) {
        //서버로 가입 양식 제출
        e.preventDefault();
        const {
            id,
            email,
            pw
        } = this.state;

        const signupInfo = {
            id: this.state.id,
            pw: this.state.pw,
            email: this.state.email
        };

        const signup_info = {
            method: "POST",
            body: JSON.stringify(signupInfo),
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (
            id &&
            pw &&
            email
        ) {
            fetch("http://localhost:8080/signup", signup_info)
                .then(alert("가입이 완료되었습니다."))
                .then(this.props.history.push("/"));
        } else {
            alert("입력값을 확인해주세요");
        }
        
    }

    render() {
        return (
            <section>
                <form
                    className="register-form"  
                    onSubmit={this.handleSubmit}
                >
                    <input 
                        type="text" 
                        className="id-input" 
                        name="id"
                        value={this.state.id}
                        onChange={this.handleChange} 
                        placeholder="학번"
                    />

                    <input 
                        type="text" 
                        className="pw-input" 
                        name="pw"
                        value={this.state.pw}
                        onChange={this.handleChange} 
                        placeholder="PW"
                    />

                    <input 
                        type="text" 
                        className="email-input" 
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} 
                        placeholder="EMAIL"
                    />
                    <button className="text-button">register</button>
                </form>
            </section>
        )
        
    }
}

export default Register