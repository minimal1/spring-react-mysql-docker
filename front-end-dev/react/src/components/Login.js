import React from 'react'

class Login extends React.Component {
    render() {
        return (
            <section>
                <form
                    className="login-form"    
                >
                    <input type="text" className="id-input" placeholder="ID"/>
                    <input type="text" className="pw-input" placeholder="PW"/>
                </form>
            </section>
        )
        
    }
}

export default Login