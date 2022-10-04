import {apiClient} from "./AxiosConfig";

const loginByEmailPassword = async ({email, password}: any) => {
    let data = {
        username: email,
        password: password,
    };
    const response = await apiClient.post<any>("/auth/login", data);
    return response.data;
}

const UserService = {
    loginByEmailPassword
}

export default UserService;