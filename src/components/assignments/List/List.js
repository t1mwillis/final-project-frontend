import React from 'react'
import { Link } from 'react-router-dom'

import Actions from './List.Actions'

export default ({ currentUserId, destroyAssignment, user, profile, alert  }) => {
  const assignments = profile.assignments.map(assignment => (
    <div key={assignment._id} className='card mb-3'>
      <div className='card-body'>
        <h2 className='card-text'>{ assignment.title }</h2>
        <p className='card-text'>{ assignment.description } </p>
        <p className='card-text'><a href={ assignment.link }>Project Link</a></p>

      </div>
      <Actions 
        currentUserId={currentUserId}
        destroyAssignment={destroyAssignment}
        assignment={assignment}
        profile={profile} />
    </div>
  ))

  const alertType = alert.action === `delete` ? `alert-danger mb-3 p-3` : `alert-success mb-3 p-3`

  const alertMessage = alert.message.length > 0 ? <p className={alertType}> { alert.message } </p> : null

  return (
    <React.Fragment>
      <h1 className='mb-4'>{ profile.firstName }'s Assignments</h1>
      { alertMessage }
      { assignments.length > 0
        ? assignments
        : <p>You don't have any assignments, maybe you should <Link to='/assignments/new'>create one!</Link></p>
      }
    </React.Fragment>
  )
}
