import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

//helper functions
import * as auth from '../api/auth.js'
import * as token from '../helpers/local-storage'

//components
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import LoginForm from './auth/Login.Form'
import SignupForm from './auth/Signup.Form'
import StudentsContainer from './students/Container'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUserId: null,
            loading: true,
            admin: false,
            errors: {
                signup: [],
                login: []
            }
        }

        this.loginUser = this.loginUser.bind(this)
        this.signupUser = this.signupUser.bind(this)
        this.logoutUser = this.logoutUser.bind(this)
    }

    async componentDidMount () {
        if (token.getToken()){
            const { user } = await auth.profile()
            this.setState({ currentUserId: user._id, admin: user.admin, loading: false})
        } else {
            this.setState({ loading: false })
        }
    }

    async loginUser (user){
        const response = await auth.login(user)
        if(response.status !== 200) {
            this.setState({ errors: {login: [response.message]}})
        } else {
            await token.setToken(response)
            const profile = await auth.profile()
            this.setState({ currentUserId: profile.user._id, admin: profile.user.admin })
        }
    }

    logoutUser () {
        token.clearToken()
        this.setState({ currentUserId: null, admin: false })
    }

    async signupUser (user) {
        const response = await auth.signup(user)
        if(response.status !== 201) {
            console.log(response)
            this.setState({errors:{ signup: [response.message]} })
        } else {
            await token.setToken(response)
            const profile = await auth.profile()
            this.setState({ currentUserId: profile.user._id, admin: profile.user.admin })
        }
        
    } 

    render () {
        const { currentUserId, loading, admin, errors } = this.state
        if(loading) return <p>Loading...</p>
        return (
            
            <Router>
                <Header />
                <Navigation currentUserId={currentUserId} logoutUser={this.logoutUser} admin={admin}/>
                <Switch>
                    <Route path='/login' exact component={() =>{
                        return currentUserId ? <Redirect to='/' /> : <LoginForm onSubmit={this.loginUser} errors={errors.login} />
                    }} />
                    <Route path='/signup' exact component={() =>{
                        return currentUserId ? <Redirect to='/' /> : <SignupForm onSubmit={this.signupUser} errors={errors.signup} />
                    }} />
                    <Route path='/' render={() => {
                        return currentUserId ? <StudentsContainer currentUserId={currentUserId} admin={admin}/> : <Redirect to='/login' />
                    }} />

                    <Redirect to='/login' />

                </Switch>
            </Router>
        )
    }
}

export default App