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
}