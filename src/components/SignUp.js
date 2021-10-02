import React, { useState } from 'react';
import { useHistory } from 'react-router';


const SignUp = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const history = useHistory();
    const handleSignUp = () => {
        const cred = JSON.parse(localStorage.getItem('credentials')).find(o => o.email === mail)
        if (!cred) {
            let credentials = [];
            const newCredentials = {
                email: mail,
                Username: Username,
                password: password
            };
            credentials.push(newCredentials);
            credentials = credentials.concat(JSON.parse(localStorage.getItem('credentials') || '[]'));
            localStorage.setItem("credentials", JSON.stringify(credentials));
            localStorage.setItem('currentUser', JSON.stringify(cred));
            history.push("/home");
        }
        else console.log('User already registered');

    }
    return <div className="formWrapper">
        <div>
            <h3>Signup Here</h3>
            <div className="container">
                <input type="email" name="mail" placeholder="Email" onChange={e => setMail(e.target.value)} required></input>
                <input type="text" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} required></input>
                <input type="password" name="currpassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required></input>
                <input type="text" name="repPassword" placeholder="Repeat Password"></input>
                <input type="submit" value="SignUp Here" onClick={handleSignUp}></input>
            </div>
        </div>
    </div>

};
export default SignUp;