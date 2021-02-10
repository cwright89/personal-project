
import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../Ducks/reducer'
import Header from '../../Components/Header/Header'
import './Login.css'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            registerView: false
        }
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleToggle = () => {
        this.setState({ registerView: !this.state.registerView })
    }

    handleRegister = () => {
        const { username, email, password, verPassword} = this.state

        if (password && password === verPassword) {
            axios.post('/api/register', { username, email, password})
                .then(res => {
                  console.log(res.data)
                    this.props.getUser(res.data)
                    this.props.history.push('/')
                })
                .catch(err => console.log(err))
        } else {
            alert("Passwords don't match")
        }
    }

    handleLogin = () => {
        const { email, password } = this.state

        axios.post('/api/login', { email, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <section className='Login'>
            <Header />
            <div className='landing-container'
            >
            
                <section className='authentication-info'>
                  
                    {this.state.registerView
                        ? (
                            <>
                                <h3>Register Below</h3>
                                <input
                                    className="login-input"
                                    value={this.state.username}
                                    name='username'
                                    placeholder='Username'
                                    onChange={e => this.handleInput(e)} />
                            </>
                        )
                        : <h3>Login Below</h3>}
                    <input
                        className="login-input"
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={e => this.handleInput(e)} />
                    <input
                        className="login-input"
                        value={this.state.password}
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={e => this.handleInput(e)} />
                    {this.state.registerView
                        ? (
                            <>
                                <input
                                    className="login-input"
                                    value={this.state.verPassword}
                                    name='verPassword'
                                    type='password'
                                    placeholder='Verify Password'
                                    onChange={e => this.handleInput(e)} />
                                

                                <button className='login-button'onClick={this.handleRegister}>Register</button>
                                <p>Have an account? <span onClick={this.handleToggle}>Login here</span></p>
                            </>
                        )
                        : (
                            <>
                                <button className='login-button' onClick={this.handleLogin}>Login</button>
                                <p>Don't have an account? <span onClick={this.handleToggle}>Register here</span></p>
                            </>
                        )}
                </section>
            </div>
            </section>
        )
    }
}

export default connect(null, { getUser })(Login)