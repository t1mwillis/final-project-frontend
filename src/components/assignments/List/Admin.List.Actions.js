import React from 'react'

import GradeForm from '../Form/Grade.Form'

export default ({ gradeAssignment, assignment, user, refreshUsers }) => (
  <div className='card-body'>
    {
        <> 
        <GradeForm 
            assignment={assignment}
            onSubmit={gradeAssignment}
            refreshUsers={refreshUsers}
            user={user}
        />
        </>
    }
  </div>
)