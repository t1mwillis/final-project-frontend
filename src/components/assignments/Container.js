import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as api from '../../api/assignments'

import List from './List/List'

class Container extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { currentUserId, profile, admin, users, refreshUsers } = this.props
        return (
          <>
            <Route path='/' exact component={() => {
              return <List currentUserId={currentUserId} destroyAssignment={this.destroyAssignment} profile={profile} />
            }} />
          </>
        )
      }
}

export default withRouter(Container)