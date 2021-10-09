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
    const [errorObj, setErrorObj] = useState({
        mail: '',
        username: '',
        password: '',
        repPassword: ''
    });
    const handleChange = (e) => {
        setFieldObj({ ...fieldObj, [e.target.name]: e.target.value });
        if (errorObj[e.target.name]) setErrorObj({ ...errorObj, [e.target.name]: '' })
    }
    const history = useHistory();
    const fieldValidator = () => {
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const passPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        const currErrorObj ={...errorObj};
        let flag = true;
        if (!fieldObj.mail) {
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        } else if (!emailPattern.test(fieldObj.mail)) {
            setErrorObj({ ...errorObj, mail: 'Invalid Email Address' });
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        }
        if (!fieldObj.username) {
            setErrorObj({ ...errorObj, username: 'This field is required' });
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        }
        if (!fieldObj.password) {
            setErrorObj({ ...errorObj, password: 'This field is required' });
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        } else if (!passPattern.test(fieldObj.password)) {
            setErrorObj({ ...errorObj, password: 'One numeric and special char required' });
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        }
        if (!fieldObj.repPassword) {
            setErrorObj({ ...errorObj, repPassword: 'This field is required' });
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        }
        if (fieldObj.repPassword !== fieldObj.password) {
            setErrorObj({ ...errorObj, repPassword: 'Password Mismatch' });
            currErrorObj.mail = 'This Input Field is required'
            flag = false;
        }
        setErrorObj(currErrorObj);
        return flag;
    }

    const handleSignUp = () => {
        console.log('fieeldObj', fieldObj);
        const validValue = fieldValidator();
        if (validValue) {
            let storedData = localStorage.getItem('credentials');
            if (storedData) {
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
            else setErrorObj({ ...errorObj, mail: 'User already registered - please Login' });
        }

    }
    return <div className="formWrapper">
        <div>
            <h3>Signup Here</h3>
            <div className="container">
                <Input type="email"
                    name="mail"
                    title="Email"
                    value={fieldObj.mail}
                    setOnChange={handleChange}
                    required={true}
                    errMsg={errorObj.mail}
                />
                <Input
                    type="text"
                    name="username"
                    title="Username"
                    value={fieldObj.username}
                    setOnChange={handleChange}
                    required={true}
                    errMsg={errorObj.username}
                />
                <Input
                    type="password"
                    name="password"
                    title="Password"
                    value={fieldObj.password}
                    setOnChange={handleChange}
                    required={true}
                    errMsg={errorObj.password}
                />
                <Input
                    type="password"
                    name="repPassword"
                    title="Repeat Password"
                    value={fieldObj.repPassword}
                    setOnChange={handleChange}
                    required={true}
                    errMsg={errorObj.repPassword}
                />
                <Button
                    type={'primary'}
                    customButtonClass={'submitButton'}
                    onClick={handleSignUp}
                    title={'Sign Up'}
                />
            </div>
        </div>
    </div>

};
export default SignUp;