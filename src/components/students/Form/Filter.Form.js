import React from 'react'

export default class FilterForm extends React.Component {
  constructor (props) {
    super(props)
    const { grade = {} } = this.props
    const { min = '', max = '' } = grade
    this.state = { min, max }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { users } = this.props

    if (users) {
      const body = Object.assign({}, this.state)
      console.log(body)
      this.props.onSubmit(body)
    } else {
      this.props.onSubmit(this.state)
    }

  }

  render () {
      return <form onSubmit={this.handleSubmit} className=''>
          <div className='d-flex flex-row mb-3'>
            <div className='w-25 d-flex align-items-center justify-content-center'>
                <label htmlFor='min'>Score is Above:</label>
                <input
                className='form-control w-50'
                id='min'
                onChange={this.handleChange}
                name='min'
                type='text'
                value={this.state.min} />
            </div>
            <div className='w-25 d-flex align-items-center justify-content-center'>
                <label htmlFor='max'>Score is Below:</label>
                <input
                className='form-control w-50'
                id='max'
                onChange={this.handleChange}
                name='max'
                type='text'
                value={this.state.max} />
            </div>
            <button type='submit' className='btn btn-primary w-25'>Filter</button>
        </div>
        
      </form>
  }
}