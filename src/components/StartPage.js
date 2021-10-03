import React, { Component } from 'react';
import Button from './common/Button';
import Login from './Login';
import SignUp from './SignUp';
import './Components.css';


class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = { login: true }
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
                {!this.state.login && <Button type ={'primary'} customButtonClass={'headerButton'} onClick={this.handleLogin} title={'Login'}/>}
                {this.state.login && <Button type ={'primary'} customButtonClass={'headerButton'} onClick={this.handleSignup} title={'Sign Up'}/>}
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
