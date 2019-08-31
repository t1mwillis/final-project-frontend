import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as api from '../../api/users'
import * as apiAssign from '../../api/assignments'

import List from './List/List'
import AssignmentList from '../assignments/List/List'

import AssignmentsContainer from '../assignments/Container'
import EditForm from '../assignments/Form/Edit.Form'
import NewForm from '../assignments/Form/New.Form'
import AdminList from '../assignments/List/Admin.List'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
      profile: {}
    }

    this.refreshUsers = this.refreshUsers.bind(this)
    this.refreshProfile = this.refreshProfile.bind(this)

    this.createAssignment = this.createAssignment.bind(this)
    this.destroyAssignment = this.destroyAssignment.bind(this)
    this.editAssignment = this.editAssignment.bind(this)
    this.gradeAssignment = this.gradeAssignment.bind(this)
  }

  async refreshUsers () {
    const { admin } = this.props
    const users = await ( admin 
        ?  api.fetchUsersAdmin()
        : api.fetchUsers()
    )
    const { response } = users
    this.setState({ users: response })
  }

  async refreshProfile (id) {
      const { response } = await api.fetchProfile(id)
      this.setState({ profile: response})
  }

  async componentDidMount() {
      await this.refreshProfile(this.props.currentUserId)
      this.refreshUsers().then(() => this.setState({loading: false}))
  }
  
  async createAssignment (assignment) {
      const { currentUserId, history } = this.props
      console.log('Submitting Assignment: ', assignment)
      await apiAssign.createAssignment({user: {_id: currentUserId}, assignment})
      await this.refreshProfile(currentUserId)
      history.push(`/`)
  }

  async editAssignment (assignment) {
      const { currentUserId, history } = this.props
      console.log('Editing Assignment:', assignment)
      await apiAssign.updateAssignment({user: {_id: currentUserId}, assignment})
      await this.refreshProfile(currentUserId)
      history.push(`/`)
  }

  async gradeAssignment (user, assignment) {
      console.log('Grading Assignment:', assignment)
      await apiAssign.gradeAssignment({user, assignment})
      await this.refreshUsers()
  }

  async destroyAssignment (assignment) {
      const { currentUserId, history } = this.props
      console.log('Deleting Assignment:', assignment)
      await apiAssign.destroyAssignment({user: { _id: currentUserId }, assignment})
      await this.refreshProfile(currentUserId)
      history.push(`/`)
  }

  render () {
    const { currentUserId, admin } = this.props
    const { users, loading, profile } = this.state
    if(loading) return <p>Loading...</p>
    return (
      <main className='container'>

        <Route path='/' exact component={() => {
          return admin ? <Redirect to="/students" /> : (
            <AssignmentList currentUserId={currentUserId} destroyAssignment={this.destroyAssignment} profile={profile} />
          )
        }} />

        <Route path='/students' exact component={() => <List users={users} admin={admin}/>} />

        <Route path='/assignments/ungraded' exact component={() => {
            return admin ? <AdminList currentUserId={currentUserId} users={users} profile={profile} gradeAssignment={this.gradeAssignment} refreshUsers={this.refreshUsers}/> : <Redirect to='/' />
        }} />
        <Route path='/assignments/graded' exact component={() => {
            return admin ? <AdminList currentUserId={currentUserId} users={users} profile={profile} gradeAssignment={this.gradeAssignment} refreshUsers={this.refreshUsers}/> : <Redirect to='/' />
        }} />
        <Route path='/assignments/new' exact component={() => {
          return !admin ? <NewForm onSubmit={this.createAssignment} /> : <Redirect to='/' />
        }} />
        <Route path='/assignments/:assignmentId/edit' exact component={({ match }) => {
          const assignment = profile.assignments.find(assignment => assignment._id === match.params.assignmentId)
          return !admin ? <EditForm onSubmit={this.editAssignment} assignment={assignment} /> : <Redirect to='/' />
        }} />

      </main>
    )
  }
}

export default withRouter(Container)