import React from 'react'

export default ({users}) => {

    const color = (grade) => {
        let value
        switch (grade){
            case grade > 90:
                value = `green`
                break
            case grade > 80:
                value = `blue`
                break
            case grade > 70:
                value = `orange`
                break
            case grade > 60:
                value = `yellow`
                break
            case grade > 50:
                value = `red`
                break
            default:
                value =`grey`

        }
        return value
    }

    const adminList = users.map(user => (
        <li className='card mb-3' key={user._id}>
            <div className='card-body row'>
                <p className='col-sm-10'>{user.firstName} {user.lastName} - {user.email}</p>
                <p className='col-sm-2'>
                    {user.grade
                        ? `${user.grade} / 100`
                        : `TBD / 100`
                    }
                </p>
            </div>
        </li>
      ))

    return adminList
}