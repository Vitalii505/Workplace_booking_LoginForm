import { authApi } from './api'

export const login = (login, password) => (dispatch) => {
    authApi.login(login, password)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(console.log("Получить токен"));
            }
        })
}