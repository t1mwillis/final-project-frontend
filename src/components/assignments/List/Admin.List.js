import React from 'react'
import { Link } from 'react-router-dom'

import AdminActions from './Admin.List.Actions'

export default ({ currentUserId, gradeAssignment, users, refreshUsers, graded, alert  }) => {
  const assignmentCard = (user, assignment) => {
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
  }
  const alertType = alert.action === `delete` ? `alert-danger mb-3 p-3` : `alert-success mb-3 p-3`

  const alertMessage = alert.message.length > 0 ? <p className={alertType}> { alert.message } </p> : null

  const gradedAssignments = users.map(user => (
    user.assignments.map(assignment => {
      return assignment.score && assignmentCard(user, assignment)
    })
  ))

  const ungradedAssignments = users.map(user => (
    user.assignments.map(assignment => {
      return !assignment.score && assignmentCard(user, assignment)
    })
  ))

  return (
    graded
    ? <React.Fragment>
      <h1 className='mb-4'>All Graded Assignments</h1>
      { gradedAssignments.length > 0 
        ? gradedAssignments
        : <p>You've haven't graded anything! Maybe you should see if there's something to grade <Link to='/assignments/ungraded'>over here</Link>.</p>
      }
    </React.Fragment>
    :<React.Fragment>
      <h1 className='mb-4'>All Ungraded Assignments</h1>
      { alertMessage }
      { ungradedAssignments.length > 0
        ? ungradedAssignments
        : <p>You've graded everything! Nice work!</p>
      }
    </React.Fragment>
  )
}
