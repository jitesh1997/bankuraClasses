import {combineReducers} from 'redux';
const usersListReducer = (allUsers=[], action) => {
    if(action.type === 'USERS_LIST') {
        return action.payload
    } else if(action.type === 'ADD_USER') {
        return [...allUsers, action.payload]
    }
    return allUsers;
}
const  currentUserReducer = (cUser ={}, action) => {
    if(action.type === 'CURRENT_USER') {
        return action.payload
    }
    return cUser;
}


export default combineReducers({
    users: usersListReducer,
    currentUser: currentUserReducer
});
