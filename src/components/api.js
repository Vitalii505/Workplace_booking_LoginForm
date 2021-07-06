import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://bb1aeeb2f2b9.ngrok.io/'
});

export const authApi = {
    login(login, password) {
        return instance.post('login', { login, password })
    }
}