import React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleLogin = () => {
        const cred = JSON.parse(localStorage.getItem('credentials')).find(o => o.email === mail)
        if (cred) {
            if (cred.password === password) {
                console.log('User successfully loggedIn');
                localStorage.setItem('currentUser', JSON.stringify(cred));
                history.push("/home");
            } else alert('Incorrect Password');
        } else alert('User not registered please signup');
    };
    return <div className="formWrapper">
        <div>
            <h3>Login Here</h3>
            <div className="container">
                <input type="email" name="mail" placeholder="Email" onChange={e => setMail(e.target.value)} required></input>
                <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required></input>
                <input type="submit" value="Log In" onClick={handleLogin}></input>
            </div>
        </div>
    </div>

};
export default Login;