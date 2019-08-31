import React from 'react'

export default class AdminList extends React.Component {
    constructor (props) {
        super(props)
        const { grade = {}, users } = this.props
        const { min = '', max = '' } = grade
        this.state = { users, min, max }
    
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      handleChange ({ target: { name, value } }) {
        this.setState({ [name]: value })
      }
    
      handleSubmit (e) {
        e.preventDefault()
        let { users } = this.props
        const {min, max} = this.state
    
        if (users) {
        
          console.log(this.state.min)
          console.log(this.state.min)
          if (max) users = users.filter(user => user.grade < max)
          if (min) users = users.filter(user => user.grade > min)
          this.setState({users})
        } else {
          this.props.onSubmit(this.state)
        }
    
      }
      render() {
        const { users } = this.state
        const color = (grade) => {
            let value
            if (grade >= 90) value = `green`
            else if (grade < 90 && grade >= 80) value = `blue`
            else if (grade < 80 && grade >= 70) value = `orange`
            else if (grade < 70 && grade >= 60) value = `yellow`
            else if (grade < 60) value = `red`
            else if (grade === undefined) value = `grey`
            return value
        }

        const adminList = users.map(user => (
            <li className='card mb-3' key={user._id}>
                <div className='card-body row'>
                    <p className='col-sm-10'><strong>{user.firstName} {user.lastName}</strong> - {user.email}</p>
                    <p className='col-sm-2' style={{color: color(user.grade) }}>
                        {user.grade
                            ? `${user.grade} / 100`
                            : `TBD / 100`
                        }
                    </p>
                </div>
            </li>
        ))

        return (
            <React.Fragment>
            <form onSubmit={this.handleSubmit} className=''>
                <div className='d-flex flex-row mb-3'>
                    <div className='w-25 d-flex align-items-center justify-content-center'>
                        <label htmlFor='min'>Score is Above:</label>
                        <input
                        className='form-control w-50'
                        id='min'
                        onChange={this.handleChange}
                        name='min'
                        type='number'
                        value={this.state.min} 
                        min='0'
                        max='100'/>
                    </div>
                    <div className='w-25 d-flex align-items-center justify-content-center'>
                        <label htmlFor='max'>Score is Below:</label>
                        <input
                        className='form-control w-50'
                        id='max'
                        onChange={this.handleChange}
                        name='max'
                        type='number'
                        value={this.state.max} 
                        min='0'
                        max='100'/>
                    </div>
                    <button type='submit' className='btn btn-primary w-25'>Filter</button>
                </div>
            </form>
            <ul className="list-group">
            { adminList.length > 0
                ? adminList 
                : <p>No Students with that grade! Widen your filtered range.</p>
            }
            </ul>
            </React.Fragment>
        )
      }
}