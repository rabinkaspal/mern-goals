import axios from "axios";

const API_URL = "/api/users/";

//register user
const registerUser = async userData => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//login user
const loginUser = async loginData => {
    const response = await axios.post(API_URL + "login", loginData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    registerUser,
    loginUser,
    logout,
};

export default authService;
