import React from 'react';
import './Components.css';
import { useHistory } from "react-router-dom";
import Button from './common/Button';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../actions';


const WelcomePage = ({currentUser, onLoginUserData}) => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        onLoginUserData({});
        history.push("/");
    }
    return <div className="welcomeDiv">
        <div>
            <Button type ={'primary'} customButtonClass={'logoutButton'} onClick={handleLogout} title={currentUser?.username ? 'Logout': 'Login/SignUp'}/>
            <h3> {currentUser?.username ? `Hi ${currentUser.username}` : 'Unauthorized User' }</h3>
        </div>
    </div>

};
const mapStateToProps = (state) => {
    console.log('test_Login', state)
    return {currentUser: state.currentUser};
};
const mapDispatchToProps = dispatch => ({
    onLoginUserData: (cred) => dispatch(getLoggedInUser(cred)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);