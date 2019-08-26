import request from './request.js'

export const destroyAssignment = ({user, assignment}) => {
    const path = `/api/users/${user._id}/assignments/${assignment._id}`
    const options = { method: 'DELETE' }
    return request(path, options)
}

export const createAssignment = ({user, assignment}) => {
    const path = `/api/users/${user._id}/assignments`
    const options = { body: assignment, method: 'POST'}
    return request(path, options)
}

export const updateAssignment = ({user, assignment}) => {
    const path = `/api/users/${user._id}/assignments/${assignment._id}`
    const options = { body: assignment, method: 'PUT' }
    return request(path, options)
}

export const gradeAssignment = ({user, assignment}) => {
    const path = `/api/users/${user._id}/assignments/${assignment._id}/score`
    console.log(path, assignment)
    const options = { body: assignment, method: 'PUT' }
    return request(path, options)
}