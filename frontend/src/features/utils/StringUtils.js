import bcrypt from "bcryptjs/dist/bcrypt";

export const getErrorMessageStr = error => {
    return (
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
    );
};

export const getAuthorizationConfig = token => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
