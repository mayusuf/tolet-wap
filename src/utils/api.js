export const domain = "http://localhost:5000";

export const Api = {
    GetPropertyList: `${domain}/property`,
    CreateUser: `${domain}/api/user`,
    UpdateUser: `${domain}/api/user`,
    GetUser: (id) => `${domain}/api/users/${id}`,
    Login: `${domain}/api/login`
};