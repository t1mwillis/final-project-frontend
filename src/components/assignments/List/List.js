import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyAssignment, user, profile  }) => {
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
        profile={profile}
        user={user} />
    </div>
  ))

  return (
    <React.Fragment>
      <h1 className='mb-4'>{ profile.firstName }'s Assignments</h1>
      { assignments }
    </React.Fragment>
  )
}
