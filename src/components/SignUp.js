import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from './common/Button';
import Input from './common/Input';

const SignUp = () => {
    const [fieldObj, setFieldObj] = useState({});
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const history = useHistory();
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const [usernameError, setUsernameErr] = useState('');
    const [repPassError, setRepPassErr] = useState('');
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
        if (!username) {
            setUsernameErr('This field is required');
            return false;
        }
        if (!password) {
            setPassError('This Input Field is required');
            return false;
        } else {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (!pattern.test(password)) {
                setPassError('One numeric and special char required');
                return false;
            }
        }
        if (!repPassword) {
            setRepPassErr('This Input Field is required');
            return false;
        } else {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (!pattern.test(password)) {
                setRepPassErr('One numeric and special char required');
                return false;
            }
        }
        if (repPassword !== password) {
            setRepPassErr('Password Mismatch');
            return false;
        }
        return true;
    }

    const handleSignUp = () => {
        const validValue = fieldValidator();
        if (validValue) {
            let storedData = localStorage.getItem('credentials');
            if(storedData) {
                storedData = JSON.parse(storedData);
            }
            const cred = storedData.find(o => o.email === mail)
            if (!cred) {
                let credentials = storedData || [];
                const newCredentials = {
                    email: mail,
                    Username: username,
                    password: password
                };
                credentials.push(newCredentials);
                localStorage.setItem("credentials", JSON.stringify(credentials));
                localStorage.setItem('currentUser', JSON.stringify(newCredentials));
                history.push("/home");
            }
            else setSubmitError('User already registered');
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
                {submitError && <div className="error-message">{submitError}</div>}
            </div>
        </div>
    </div>

};
export default SignUp;