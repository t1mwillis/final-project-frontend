import request from './request.js'

export const fetchUsers = () => request('/api/users')

export const fetchUsersAdmin = () => request('/api/users/admin')

export const fetchProfile = (id) => request(`/api/users/${id}`)