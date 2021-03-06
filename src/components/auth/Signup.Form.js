import React from 'react'
import { withRouter } from 'react-router'

class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  async handleSubmit (e) {
    e.preventDefault()
    await this.props.onSubmit(this.state)
    this.props.history.push('/')
    
  }

  render () {
    const {errors} = this.props
    return (
      <main className='container'>
        <section className='row justify-content-md-center'>
          <div className='col col-lg-5'>
          <h1>Signup</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Email Address</label>
              <input
                className='form-control'
                id='email'
                onChange={this.handleChange}
                name='email'
                type='email'
                value={this.state.username} 
                placeholder='example@email.com'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form-control'
                id='password'
                onChange={this.handleChange}
                name='password'
                type='password'
                value={this.state.password} 
                placeholder='min. length 8 characters'
                required 
                minLength='8' />
            </div>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                className='form-control'
                id='firstName'
                onChange={this.handleChange}
                name='firstName'
                type='text'
                value={this.state.firstName} 
                placeholder='John'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                className='form-control'
                id='lastName'
                onChange={this.handleChange}
                name='lastName'
                type='text'
                value={this.state.lastName} 
                placeholder='Snow'
                required />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>

            {errors.length > 0 && <ul className='alert alert-danger mt-3'>
              <li>{errors}</li>

            </ul>}

          </form>
        </div>
      </section>
    </main>
    )
  }
}

export default withRouter(SignupForm)