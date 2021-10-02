import React from 'react';
import './Components.css';
import { useHistory } from "react-router-dom";
import Button from './common/Button';


const WelcomePage = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        history.push("/");
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return <div className="welcomeDiv">
        <div>
            <Button type ={'primary'} customButtonClass={'logoutButton'} onClick={handleLogout} title={user?.Username ? 'Logout': 'Login/SignUp'}/>
            <h3> {user?.Username ? `Hi ${user.Username}` : 'Unauthorized User' }</h3>
        </div>
    </div>

};
export default WelcomePage;