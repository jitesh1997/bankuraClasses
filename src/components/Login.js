import React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from './common/Button';
import Input from './common/Input';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../actions';

const Login = props => {
    const history = useHistory();
    const [fieldObj, setFieldObj] = useState({
        mail: '',
        password: '',
    });
    const [errorObj, setErrorObj] = useState({
        mail: '',
        password: '',
    });
    const fieldValidator = () => {
        let flag = true;
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!fieldObj.mail) {
            setErrorObj({ ...errorObj, mail: 'This Input Field is required' });
            flag = false;
        } else if (!pattern.test(fieldObj.mail)) {
            setErrorObj({ ...errorObj, mail: 'Invalid Email Address' });
            flag = false;
        }
        if (!fieldObj.password) {
            setErrorObj({ ...errorObj, password: 'This Input field is required' });
            flag = false;
        }
        return flag;
    }
    const handleChange = (e) => {
        setFieldObj({ ...fieldObj, [e.target.name]: e.target.value });
        if (errorObj[e.target.name]) setErrorObj({ ...errorObj, [e.target.name]: '' })
    }
    const handleLogin = () => {
        const validValue = fieldValidator();
        if (validValue) {
            const cred = JSON.parse(localStorage.getItem('credentials')).find(o => o.mail === fieldObj.mail)
            if (cred) {
                if (cred.password === fieldObj.password) {
                    console.log('User successfully loggedIn');
                    localStorage.setItem('currentUser', JSON.stringify(cred));
                    props.onloginUserData(cred);
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
    console.log('state', state);
    return state;
}
const mapDispatchToProps = dispatch => ({
    onloginUserData: (cred) => dispatch(getLoggedInUser(cred))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);