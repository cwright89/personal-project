import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, clearUser } from '../../Ducks/reducer'
import './Profile.css'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            profilePicture: '',
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

    handleProfilePicInput = (val) => {
      this.setState({profilePicture: val})
  }

    updateProfilePic = () => {
      axios.put(`/api/user/${this.props.users.user_id}`, { profilePicture: this.state.profilePicture })
          .then(res => {
              this.props.getUser(res.data[0])
              this.handleEditView()
              this.setState({profilePicture: ''})
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
            <section className='profile'>

                <img
                    className='profile-picture'
                    src={this.props.user.profile_picture}
                    alt={this.props.user.username} />
                    {!this.state.editView
                  ? (
                    <div>
                      <button onClick={this.handleEditView}>Edit Profile Picture</button>
          
                    </div>
                  )
                  : (
                    <div>
                      <input
                        value={this.state.profilePicture}
                        placeholder='New Profile Pic'
                        onChange={e => this.handleProfilePicInput(e.target.value)} />
                      <button onClick={this.updateProfilePic} id='edit-btn'>Submit</button>
                    </div>
                  )}
                {!this.state.editView
                  ? (
                    <div>
                      <h2>{this.props.user.username}</h2>
                      <button onClick={this.handleEditView}>Edit Username</button>
          
                    </div>
                  )
                  : (
                    <div>
                      <input
                        value={this.state.username}
                        placeholder='New Username'
                        onChange={e => this.handleInput(e.target.value)} />
                      <button onClick={this.updateUsername} id='edit-btn'>Submit</button>
                    </div>
                  )}
                  <h2>{this.props.user.email}</h2>
                  <button onClick={this.handleLogout}>Logout</button>
            </section>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser, clearUser })(Profile)