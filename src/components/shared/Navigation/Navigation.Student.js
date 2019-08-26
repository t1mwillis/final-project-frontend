import React from 'react'
import { Link } from 'react-router-dom'

export default ({logout}) => {
    return (
        <React.Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/students'>All Students</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to={`/assignments/new`}>
                Create a New Assignment
                </Link>
            </li>
            <li className='nav-item'>
                <button
                className='btn btn-link'
                onClick={logout}>
                    Logout
                </button>
            </li>
        </React.Fragment>
    )
}