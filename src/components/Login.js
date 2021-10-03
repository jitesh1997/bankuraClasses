import React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from './common/Button';
import Input from './common/Input';

const Login = () => {
    const history = useHistory();
    const [passError, setPassError] = useState('');
    const [mailError, setMailError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [fieldObj, setFieldObj] = useState({
        mail: '',
        password: '',
    });
    const fieldValidator = () => {
        if (!fieldObj.mail) {
            setMailError('This Input Field is required')
            return false;
        } else {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!pattern.test(fieldObj.mail)) {
                setMailError('Invalid Email Address');
                return false;
            }
        }
        if (!fieldObj.password) {
            setPassError('This Input Field is required');
            return false;

        }
        return true;
    }
    const handleLogin = () => {
        const validValue = fieldValidator();
        console.log('validValue', validValue);
        if (validValue) {
            const cred = JSON.parse(localStorage.getItem('credentials')).find(o => o.mail === fieldObj.mail)
            if (cred) {
                if (cred.password === fieldObj.password) {
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
                    value={fieldObj.mail}
                    customButtonClass={'inputField'}
                    setOnChange={e => setFieldObj({...fieldObj, mail: e.target.value})}
                    setOnClick={() => setMailError('')}
                    required={true}
                    errMsg={mailError}
                />
                <Input
                    type="password"
                    name="password"
                    title="Password"
                    value={fieldObj.password}
                    customButtonClass={'inputField'}
                    setOnChange={e => setFieldObj({...fieldObj, password: e.target.value})}
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