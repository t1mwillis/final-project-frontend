import React from 'react'

import AdminActions from './Admin.List.Actions'

export default ({ currentUserId, gradeAssignment, users, refreshUsers  }) => {
  console.log(refreshUsers)
  console.log(users)
  const assignments = users.map(user => (
    user.assignments.map(assignment => {
    return <div key={assignment._id} className='card mb-3'>
      <div className='card-body row'>
        <div className='col-sm-8'>
        <h2 className='card-text'>{ assignment.title } {user.firstName} {user.lastName}</h2>
        <p className='card-text'>{ assignment.description } </p>
        <p className='card-text'><a href={ assignment.link }>Project Link</a></p>
        
      </div>
      <div className="col-sm-4">
      <AdminActions 
        currentUserId={currentUserId}
        gradeAssignment={gradeAssignment}
        assignment={assignment}
        user={user}
        refreshUsers={refreshUsers} />
        </div>
      </div>
      
    </div>
    })
    
  ))

  return (
    <React.Fragment>
      <h1 className='mb-4'>All Assignments</h1>
      { assignments }
    </React.Fragment>
  )
}
