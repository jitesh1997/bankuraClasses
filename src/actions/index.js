export const getLoggedInUser = (currentUser) => {
    return {
        type: 'CURRENT_USER',
        payload: currentUser
    };
};
export const getUserDataList = (list) => {
    return {
        type: 'USERS_LIST',
        payload: list
    }
};
export const AddNewUser = (newUser) => {
    return {
        type: 'ADD_USER',
        payload: newUser
    }
}
