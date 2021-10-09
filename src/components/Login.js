import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from './common/Button';
import Input from './common/Input';
import { connect } from 'react-redux';
import { getLoggedInUser, getUserDataList } from '../actions';

const Login = ({onLoadAllData, onLoginUserData, users, onNewSignUp}) => {
    const history = useHistory();
    const [fieldObj, setFieldObj] = useState({
        mail: '',
        password: '',
    });
    const [errorObj, setErrorObj] = useState({
        mail: '',
        password: '',
    });
    useEffect(() => {
        const cred = localStorage.getItem('currentUser')
        if(cred) {
            onLoginUserData(JSON.parse(cred));
            history.push("/home");
        } else onLoadAllData(JSON.parse(localStorage.getItem('credentials')));
    },[]);

    const fieldValidator = () => {
        let flag = true;
        const tempErrorObj = {...errorObj};
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!fieldObj.mail) {
            tempErrorObj['mail'] = 'This Input Field is required'
            flag = false;
        } else if (!pattern.test(fieldObj.mail)) {
            tempErrorObj['mail'] = 'Invalid Email Address'
            flag = false;
        }
        if (!fieldObj.password) {
            tempErrorObj['password'] = 'This Input field is required'
            flag = false;
        }
        setErrorObj(tempErrorObj);
        return flag;
    }
    const handleChange = (e) => {
        setFieldObj({ ...fieldObj, [e.target.name]: e.target.value });
        if (errorObj[e.target.name]) setErrorObj({ ...errorObj, [e.target.name]: '' })
    }
    const handleLogin = () => {
        const validValue = fieldValidator();
        console.log('errorObj Is', errorObj);
        if (validValue) {
            const cred = users.find(o => o.mail === fieldObj.mail)
            if (cred) {
                if (cred.password === fieldObj.password) {
                    console.log('User successfully loggedIn');
                    localStorage.setItem('currentUser', JSON.stringify(cred));
                    onLoginUserData(cred);
                    history.push("/home");
                } else setErrorObj({ ...errorObj, password: 'Incorrect Password' });
            } else setErrorObj({ ...errorObj, mail: 'User not registered please signup' });
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
                    setOnChange={handleChange}
                    required={true}
                    errMsg={errorObj.mail}
                />
                <Input
                    type="password"
                    name="password"
                    title="Password"
                    value={fieldObj.password}
                    setOnChange={handleChange}
                    required={true}
                    errMsg={errorObj.password} />
                <Button type={'primary'}
                    customButtonClass={'submitButton'}
                    onClick={handleLogin}
                    title={'Login'}
                />
            </div>
        </div>
    </div>

};
const mapStateToProps = (state) => {
    console.log('test_Login', state)
    return {users: state.users};
};
const mapDispatchToProps = dispatch => ({
    onLoginUserData: (cred) => dispatch(getLoggedInUser(cred)),
    onLoadAllData: (data) => dispatch(getUserDataList(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);