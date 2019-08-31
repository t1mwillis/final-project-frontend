import React from 'react'

import AdminList from './List.AdminList'
import StudentList from './List.StudentList'

export default ({ users, admin }) => {

  return admin 
        ?  <AdminList users={users}/>
        :  <StudentList users={users}/>
}
