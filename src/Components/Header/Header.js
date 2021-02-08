import { withRouter, Link } from 'react-router-dom'
import React, {Component} from 'react'
import './Header.css'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownView: false
        }
    }
    toggleDropdown = () => {
        this.setState({dropdownView: !this.state.dropdownView})
      }

    render(){
    return (
        <header className='header'>
            <h1 className='Site-name'>Movie Blog</h1>
           
                <nav classname='menu'>
                   <span> <Link to='/' className='nav-links'>Home</Link></span> 
                   <span>  <Link to='/contact' className='nav-links'>Contact</Link></span> 
                   <span>  <Link to='/login' className='nav-links'>Login</Link></span> 
                   <span>  <Link to='/profile' className='nav-links'>Profile</Link></span> 
                </nav>
                <div className='dropdown' onClick={this.toggleDropdown}>Menu</div>
          {this.state.dropdownView
            ? (
              <nav className='mobile-menu'>
                  <span> <Link to='/' className='nav-links'>Home</Link></span> 
                  <span> <Link to='/contact' className='nav-links'>Contact</Link></span> 
                  <span> <Link to='/login' className='nav-links'>Login</Link></span> 
                  <span> <Link to='/profile' className='nav-links'>Profile</Link></span> 
              </nav>
            )
            : null}
           
        </header>
    )

    }
}

export default withRouter(Header)