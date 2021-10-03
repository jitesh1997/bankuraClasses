import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from './common/Button';
import Input from './common/Input';

const SignUp = () => {
    const [fieldObj, setFieldObj] = useState({
        mail: '',
        username: '',
        password: '',
        repPassword: ''
    });
    const history = useHistory();
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const [usernameError, setUsernameErr] = useState('');
    const [repPassError, setRepPassErr] = useState('');
    const [submitError, setSubmitError] = useState('');
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
        if (!fieldObj.username) {
            setUsernameErr('This field is required');
            return false;
        }
        if (!fieldObj.password) {
            setPassError('This Input Field is required');
            return false;
        } else {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (!pattern.test(fieldObj.password)) {
                setPassError('One numeric and special char required');
                return false;
            }
        }
        if (!fieldObj.repPassword) {
            setRepPassErr('This Input Field is required');
            return false;
        } else {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            if (!pattern.test(fieldObj.password)) {
                setRepPassErr('One numeric and special char required');
                return false;
            }
        }
        if (fieldObj.repPassword !== fieldObj.password) {
            setRepPassErr('Password Mismatch');
            return false;
        }
        return true;
    }

    const handleSignUp = () => {
        console.log('fieeldObj', fieldObj);
        const validValue = fieldValidator();
        if (validValue) {
            let storedData = localStorage.getItem('credentials');
            if(storedData) {
                storedData = JSON.parse(storedData);
            }
            const cred = storedData.find(o => o.mail === fieldObj.mail)
            if (!cred) {
                let credentials = storedData || [];
                credentials.push(fieldObj);
                localStorage.setItem("credentials", JSON.stringify(credentials));
                localStorage.setItem('currentUser', JSON.stringify(fieldObj));
                history.push("/home");
            }
            else setSubmitError('User already registered');
        }

    }
    return <div className="formWrapper">
        <div>
            <h3>Signup Here</h3>
            <div className="container">
                <Input type="email" name="mail" title="Email" value={fieldObj.mail} customButtonClass={'inputField'} setOnChange={e => setFieldObj({...fieldObj, mail: e.target.value})} required={true} errMsg={mailError} />
                <Input type="text" name="username" title="Username" value={fieldObj.username} customButtonClass={'inputField'} setOnChange={e => setFieldObj({...fieldObj, username: e.target.value})} required={true} errMsg={usernameError} />
                <Input type="password" name="password" title="Password" value={fieldObj.password} customButtonClass={'inputField'} setOnChange={e => setFieldObj({...fieldObj, password: e.target.value})} required={true} errMsg={passError} />
                <Input type="password" name="repPassword" title="Repeat Password" value={fieldObj.repPassword} customButtonClass={'inputField'} setOnChange={e => setFieldObj({...fieldObj, repPassword: e.target.value})} required={true} errMsg={repPassError} />
                <Button type={'primary'} customButtonClass={'submitButton'} onClick={handleSignUp} title={'Sign Up'} />
                {submitError && <div className="error-message">{submitError}</div>}
            </div>
        </div>
    </div>

};
export default SignUp;