import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default ({ currentUserId, destroyAssignment, assignment, profile }) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    {
      currentUserId === profile._id 
      && 
      (
        <> 
        <Link className='btn btn-link' to={`/assignments/${assignment._id}/edit`}>Edit</Link>
        <button
          className='btn btn-link text-danger'
          onClick={() => destroyAssignment(assignment)}>
          Delete
        </button>
        </>
      )
    }
    <span className='btn btn-link text-muted' disabled>Submitted {moment(assignment.created_at).fromNow()}</span>
  </div>
)