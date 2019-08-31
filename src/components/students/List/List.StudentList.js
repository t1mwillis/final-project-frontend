import React from 'react'

export default ({users}) => {

    const list = users.map(user => (
        <li className='card mb-3' key={user._id}>
            <div className='card-body row'>
            <p><strong>{user.firstName} {user.lastName}</strong> - {user.email}</p>
            </div>
        </li>
      ))

    return list
}