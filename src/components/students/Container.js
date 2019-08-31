import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as api from '../../api/users'
import * as apiAssign from '../../api/assignments'

import List from './List/List'
import AssignmentList from '../assignments/List/List'

import EditForm from '../assignments/Form/Edit.Form'
import NewForm from '../assignments/Form/New.Form'
import AdminList from '../assignments/List/Admin.List'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
      profile: {},
      alert: {
        message: '',
        type: ''
      }
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
      await apiAssign.createAssignment({user: {_id: currentUserId}, assignment})
      await this.refreshProfile(currentUserId)
      this.setState({alert: {message: `Created assignment: ${assignment.title}`, action: `create`}})
      history.push(`/`)
  }

  async editAssignment (assignment) {
      const { currentUserId, history } = this.props
      await apiAssign.updateAssignment({user: {_id: currentUserId}, assignment})
      await this.refreshProfile(currentUserId)
      this.setState({alert: {message: `Edited assignment: ${assignment.title}`, action: `edit`}})
      history.push(`/`)
  }

  async gradeAssignment (user, assignment) {
      await apiAssign.gradeAssignment({user, assignment})
      await this.refreshUsers()
      this.setState({alert: {message: `Graded assignment!`, action: `grade`}})
  }

  async destroyAssignment (assignment) {
      const { currentUserId, history } = this.props
      await apiAssign.destroyAssignment({user: { _id: currentUserId }, assignment})
      await this.refreshProfile(currentUserId)
      this.setState({alert: {message: `Deleted assignment: ${assignment.title}`, action: `delete`}})
      history.push(`/`)
  }

  render () {
    const { currentUserId, admin } = this.props
    const { users, loading, profile, alert } = this.state

    if(loading) return <p>Loading...</p>
    return (
      <main className='container'>

        <Route path='/' exact component={() => {
          return admin ? <Redirect to="/students" /> : (
            <AssignmentList currentUserId={currentUserId} destroyAssignment={this.destroyAssignment} profile={profile} alert={alert} />
          )
        }} />

        <Route path='/students' exact component={() => <List users={users} admin={admin}/>} />

        <Route path='/assignments/ungraded' exact component={() => {
            return admin ? <AdminList currentUserId={currentUserId} users={users} graded={false} profile={profile} gradeAssignment={this.gradeAssignment} refreshUsers={this.refreshUsers} alert={alert}/> : <Redirect to='/' />
        }} />
        <Route path='/assignments/graded' exact component={() => {
            return admin ? <AdminList currentUserId={currentUserId} users={users} graded={true} profile={profile} gradeAssignment={this.gradeAssignment} refreshUsers={this.refreshUsers} alert={alert}/> : <Redirect to='/' />
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