import React from 'react'

import AdminList from './List.AdminList'
import StudentList from './List.StudentList'

export default ({ users, admin }) => {

  return (
    <>
    { admin 
        ? ( 
            <>
            <p>Filter form goes here</p>
            <ul>
                <AdminList users={users}/>
            </ul>
            </>
        ) : (
            <StudentList users={users}/>
        ) 
    }
      
    </>
  )
}
