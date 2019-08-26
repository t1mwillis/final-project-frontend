import React from 'react'
import { Route } from 'react-router-dom'

import * as api from '../../api/users'

import List from './List/List'
import AssignmentsContainer from '../assignments/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
      profile: {}
    }

    this.refreshUsers = this.refreshUsers.bind(this)
    this.refreshProfile = this.refreshProfile.bind(this)
  }

  async refreshUsers () {
    const { admin } = this.props
    const users = await ( admin 
        ?  api.fetchUsersAdmin()
        : api.fetchUsers()
    )
    const { response } = users
    console.log(response)
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

  render () {
    const { currentUserId, admin } = this.props
    const { users, loading, profile } = this.state
    if(loading) return <p>Loading...</p>
    return (
      <main className='container'>
        <Route path='/students' exact component={() => <List users={users} admin={admin}/>} />
        <AssignmentsContainer 
        currentUserId={currentUserId}
        profile={profile}
        users={users} 
        admin={admin}
        refreshProfile={this.refreshProfile}
        refreshUsers={this.refreshUsers}
        />
      </main>
    )
  }
}
