import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as api from '../../api/assignments'

import List from './List/List'
import AdminList from './List/Admin.List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

class Container extends React.Component {
    constructor (props) {
        super(props)
        this.createAssignment = this.createAssignment.bind(this)
        this.editAssignment = this.editAssignment.bind(this)
        this.destroyAssignment = this.destroyAssignment.bind(this)
    }

    async createAssignment (assignment) {
        const { currentUserId, refreshProfile, history } = this.props
        console.log('Submitting Assignment: ', assignment)
        await api.createAssignment({user: {_id: currentUserId}, assignment})
        await refreshProfile(currentUserId)
        history.push(`/`)
    }

    async editAssignment (assignment) {
        const { currentUserId, refreshProfile, history } = this.props
        console.log('Editing Assignment:', assignment)
        await api.updateAssignment({user: {_id: currentUserId}, assignment})
        await refreshProfile(currentUserId)
        history.push(`/`)
    }

    async gradeAssignment (user, assignment) {
        // const { refreshUsers } = this.props
        console.log('Grading Assignment:', assignment)
        await api.gradeAssignment({user, assignment})
        // await refreshUsers()
    }

    async destroyAssignment (assignment) {
        const { currentUserId, refreshProfile, history } = this.props
        console.log('Deleting Assignment:', assignment)
        await api.destroyAssignment({user: { _id: currentUserId }, assignment})
        await refreshProfile(currentUserId)
        history.push(`/`)
    }

    render () {
        const { currentUserId, profile, admin, users, refreshUsers } = this.props
        return (
          <>
            <Route path='/' exact component={() => {
              return (
                  <>
                    {!admin 
                        ? <List currentUserId={currentUserId} destroyAssignment={this.destroyAssignment} profile={profile} />
                        : <AdminList currentUserId={currentUserId} users={users} profile={profile} gradeAssignment={this.gradeAssignment} refreshUsers={refreshUsers}/>
                    }
                </>
              )
              
            }} />
            <Route path='/assignments/ungraded' exact component={() => {
                return admin ? <AdminList currentUserId={currentUserId} users={users} profile={profile} gradeAssignment={this.gradeAssignment} refreshUsers={refreshUsers}/> : <Redirect to='/' />
            }} />
            <Route path='/assignments/graded' exact component={() => {
                return admin ? <p>Graded Assignments</p>: <Redirect to='/' />
            }} />
            <Route path='/assignments/new' exact component={() => {
              return !admin ? <NewForm onSubmit={this.createAssignment} /> : <Redirect to='/' />
            }} />
            <Route path='/assignments/:assignmentId/edit' exact component={({ match }) => {
              const assignment = profile.assignments.find(assignment => assignment._id === match.params.assignmentId)
              return !admin ? <EditForm onSubmit={this.editAssignment} assignment={assignment} /> : <Redirect to='/' />
            }} />
          </>
        )
      }
}

export default withRouter(Container)