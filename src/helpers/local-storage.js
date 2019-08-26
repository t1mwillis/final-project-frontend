const APPLICATION_STORAGE_KEY = 'grading-app'

export const setToken = ({token}) => {
    window.localStorage.setItem(APPLICATION_STORAGE_KEY, token)
}

export const getToken = () => {
    return window.localStorage.getItem(APPLICATION_STORAGE_KEY)
}

export const clearToken = () => {
    window.localStorage.clear(APPLICATION_STORAGE_KEY)
}