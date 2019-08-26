import React from 'react'
import { withRouter } from 'react-router'

import AdminNavigation from './Navigation.Admin'
import StudentNavigation from './Navigation.Student'

const AuthenticatedLinks = ({ logoutUser, history, admin }) => {
  const logout = () => {
    logoutUser()
    history.push('/login')
  }
  
  return (
    <ul className='nav d-flex'>
        { admin 
            ? <AdminNavigation logout={logout} />
            : <StudentNavigation logout={logout} />
        }
    </ul>
  )
}

export default withRouter(AuthenticatedLinks)
