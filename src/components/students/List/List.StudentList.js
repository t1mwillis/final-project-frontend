import React from 'react'

export default ({users}) => {

    const list = users.map(user => (
        <li className='card mb-3' key={user._id}>
            <div clasName='card-body row'>
            <p>{user.firstName} {user.lastName} - {user.email}</p>
            </div>
        </li>
      ))

    return list
}