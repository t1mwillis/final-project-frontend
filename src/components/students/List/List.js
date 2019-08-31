import React from 'react'

import AdminList from './List.AdminList'
import StudentList from './List.StudentList'

import FilterForm from '../Form/Filter.Form'

export default ({ users, admin }) => {

  return (
    <>
    { admin 
        ? ( 
            <>
            <FilterForm />
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
