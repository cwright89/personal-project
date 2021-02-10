/** @jsxRuntime classic */
/** @jsx jsx */
import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, clearUser } from '../../Ducks/reducer'
import './Profile.css'
import Header from '../../Components/Header/Header'
import { jsx,} from '@emotion/react/'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            editView: false
        }
    }

    handleInput = (val) => {
        this.setState({username: val})
    }

    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }

    updateUsername = () => {
        axios.put(`/api/user/${this.props.users.user_id}`, { username: this.state.username })
            .then(res => {
                this.props.getUser(res.data[0])
                this.handleEditView()
                this.setState({username: ''})
            })
            .catch(err => console.log(err))
    }
  

    handleLogout = () => {
        axios.get('/api/logout')
          .then(() => {
              this.props.clearUser()
              this.props.history.push('/')
          })
          .catch(err => console.log(err))
    }

    render(){
        return(
            <section className='profile'
            css={{
              backgroundImage: 'url(https://wallpapercave.com/wp/wp3253714.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '150vh',
        
          }}
            >
              <Header />

                <div
                css={{
                  marginTop: '200px'
                }}
                >
                {!this.state.editView
                  ? (
                    <div>
                      <h2>{this.props.user.username}</h2>
                      <button onClick={this.handleEditView} className="profile-button">Edit Username</button>
          
                    </div>
                  )
                  : (
                    <div>
                      <input
                        className="profile-input"
                        value={this.state.username}
                        placeholder='New Username'
                        onChange={e => this.handleInput(e.target.value)} />
                      <button onClick={this.updateUsername} className="profile-button"
                      css={{
                        width:'100px'
                      }}
                      >Submit</button>
                    </div>
                  )}
                  <h2>{this.props.user.email}</h2>
                  <button onClick={this.handleLogout} className='profile-button'>Logout</button>
                  </div>
            </section>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser, clearUser })(Profile)