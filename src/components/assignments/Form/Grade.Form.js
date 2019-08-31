import React from 'react'

export default class GradeForm extends React.Component {
  constructor (props) {
    super(props)
    const { assignment = {} } = this.props
    const { score = '', maxScore = '' } = assignment
    this.state = { score, maxScore }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { assignment, refreshUsers, user } = this.props
    console.log(assignment)
    console.log(this.state)
    console.log(refreshUsers)
    if (assignment && assignment._id) {
      const body = Object.assign({}, this.state, {_id: assignment._id})
      console.log(body)
      this.props.onSubmit(user, body)
    } else {
      this.props.onSubmit(this.state)
    }

  }

  render () {
      return <form onSubmit={this.handleSubmit} className=''>
          <div className='d-flex flex-row justify-content-between mb-3'>
        <div className='w-25'>
            <label htmlFor='score' className='d-none'>Score</label>
            <input
            className='form-control'
            id='score'
            onChange={this.handleChange}
            name='score'
            type='text'
            value={this.state.score} />
        </div>
        <p>Out Of</p>
        <div className='w-25'>
            <label htmlFor='maxScore' className='d-none'>Max Score</label>
            <input
            className='form-control'
            id='maxScore'
            onChange={this.handleChange}
            name='maxScore'
            type='text'
            value={this.state.maxScore} />
        </div>
        </div>
        <button type='submit' className='btn btn-primary w-100'>Save</button>
      </form>
  }
}