import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import './StartPage.css';


class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = { login: true }
    }
    handleSubmit = () => {
        alert('Form Submitted Successfully');
    }
    handleSignup = () => {
        this.setState({ login: false });
    }
    handleLogin = () => {
        this.setState({ login: true });
    }

    render() {
        return <div className="outerDiv">
            <div>
                {!this.state.login && <button className={'headerButton'} onClick={this.handleLogin}>Login</button>}
                {this.state.login && <button className={'headerButton'} onClick={this.handleSignup}>Signup</button>}
            </div>
            <div className="mainWrapper">
                {this.state.login ? <Login /> : <SignUp />}
                <div className="footerDiv">
                    <a href='/'>forgot password</a>
                </div>
            </div>
        </div>
    }
}

export default StartPage;
