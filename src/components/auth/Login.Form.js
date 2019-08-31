import React from 'react'
import { withRouter } from 'react-router'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
          <h1>Login</h1>
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
                required 
                minLength='8' />
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

export default withRouter(LoginForm)