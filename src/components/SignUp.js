import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from './common/Button';
import Input from './common/Input';

const SignUp = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const history = useHistory();
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const [usernameError, setUsernameErr] = useState('');
    const [repPassError, setRepPassErr] = useState('');
    let count = 0;
    const fieldValidator = () => {
        if (!mail) {
            setMailError('This Input Field is required')
            count++;
        } else {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!pattern.test(mail)) {
                setMailError('Invalid Email Address');
                count++;
            }
        }
        if (!username) {
            setUsernameErr('This field is required');
            count++;
        }
        if (!password) {
            setPassError('This Input Field is required');
            count++;
        } else {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (!pattern.test(password)) {
                setPassError('One numeric and special char required');
                count++;
            }
        }
        if (!repPassword) {
            setRepPassErr('This Input Field is required');
            count++;
        } else {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (!pattern.test(password)) {
                setRepPassErr('One numeric and special char required');
                count++;
            }
        }
        if (repPassword !== password) {
            setRepPassErr('Password Mismatch');
            count++;
        }
        if (count !== 0) return false;
        return true;
    }

    const handleSignUp = () => {
        const validValue = fieldValidator();
        console.log('validValue', validValue);
        if (validValue) {
            const cred = JSON.parse(localStorage.getItem('credentials')).find(o => o.email === mail)
            if (!cred) {
                let credentials = [];
                const newCredentials = {
                    email: mail,
                    Username: username,
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

    }
    return <div className="formWrapper">
        <div>
            <h3>Signup Here</h3>
            <div className="container">
                <Input type="email" name="mail" title="Email" value={mail} customButtonClass={'inputField'} setOnChange={e => setMail(e.target.value)} required={true} errMsg={mailError} />
                <Input type="text" name="username" title="Username" value={username} customButtonClass={'inputField'} setOnChange={e => setUsername(e.target.value)} required={true} errMsg={usernameError} />
                <Input type="password" name="currpassword" title="Password" value={password} customButtonClass={'inputField'} setOnChange={e => setPassword(e.target.value)} required={true} errMsg={passError} />
                <Input type="password" name="repPassword" title="Repeat Password" value={repPassword} customButtonClass={'inputField'} setOnChange={e => setRepPassword(e.target.value)} required={true} errMsg={repPassError} />
                <Button type={'primary'} customButtonClass={'submitButton'} onClick={handleSignUp} title={'Sign Up'} />

            </div>
        </div>
    </div>

};
export default SignUp;