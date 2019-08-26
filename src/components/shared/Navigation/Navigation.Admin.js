import React from 'react'
import { Link } from 'react-router-dom'

export default ({logout}) => {
    return (
        <React.Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/students'>All Students</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/assignments/ungraded'>Ungraded Assignments</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/assignments/graded'>Graded Assignemnts</Link>
            </li>
            <li className='nav-item'>
                <button
                className='btn btn-link'
                onClick={logout}>
                    Logout
                </button>
            </li>
            <li className='nav-item ml-auto p-2 bd-highlight'>Hi, Admin!</li>
        </React.Fragment>
    )
}