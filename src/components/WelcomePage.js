import React from 'react';
import './StartPage.css';
import { useHistory } from "react-router-dom";


const WelcomePage = () => {
    const history = useHistory();
    const handleLogout = () => {
        history.push("/");
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return <div className="welcomeDiv">
        <div>
            <button className={'logoutButton'} onClick={handleLogout}>Logout</button>
            <h3> Hi {user.Username}</h3>
        </div>
    </div>

};
export default WelcomePage;