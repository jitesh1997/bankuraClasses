import React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from './common/Button';
import Input from './common/Input';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [passError, setPassError] = useState('');
    const [mailError, setMailError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const fieldValidator = () => {
        if (!mail) {
            setMailError('This Input Field is required')
            return false;
        } else {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!pattern.test(mail)) {
                setMailError('Invalid Email Address');
                return false;
            }
        }
        if (!password) {
            setPassError('This Input Field is required');
            return false;

        }
        return true;
    }
    const handleLogin = () => {
        const validValue = fieldValidator();
        console.log('validValue', validValue);
        if (validValue) {
            const cred = JSON.parse(localStorage.getItem('credentials')).find(o => o.email === mail)
            if (cred) {
                if (cred.password === password) {
                    console.log('User successfully loggedIn');
                    localStorage.setItem('currentUser', JSON.stringify(cred));
                    history.push("/home");
                } else setSubmitError('Incorrect Password');
            } else setSubmitError('User not registered please signup');
        }
    };
    return <div className="formWrapper">
        <div>
            <h3>Login Here</h3>
            <div className="container">
                <Input
                    type="email"
                    name="mail"
                    title="Email"
                    value={mail}
                    customButtonClass={'inputField'}
                    setOnChange={e => {return setMail(e.target.value)}}
                    setOnClick={() => setMailError('')}
                    required={true}
                    errMsg={mailError}
                />
                <Input
                    type="password"
                    name="password"
                    title="Password"
                    value={password}
                    customButtonClass={'inputField'}
                    setOnChange={e => setPassword(e.target.value)}
                    setOnClick={() => setPassError('')}
                    required={true}
                    errMsg={passError} />
                <Button type={'primary'}
                    customButtonClass={'submitButton'}
                    onClick={handleLogin}
                    title={'Login'}
                />
                {submitError && <div className="error-message">{submitError}</div>}
            </div>
        </div>
    </div>

};
export default Login;