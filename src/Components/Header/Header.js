/** @jsxRuntime classic */
/** @jsx jsx */
import { withRouter, Link } from 'react-router-dom'
import {Component} from 'react'
import './Header.css'
import { jsx,} from '@emotion/react/'

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
        <header className='header'
        css={{
            backgroundColor: 'transparent'
        }}>
            <h1 className='Site-name'>The Movie Blog</h1>
           
                <nav className='menu'
                css={{
                    marginRight: '60px',
                }}>
                   <Link to='/' className='nav-links'
                    css={{
                        marginRight: '20px'
                    }}
                    >Home</Link> 
                   <Link to='/contact' className='nav-links'
                   css={{
                       marginRight: '20px'
                   }}
                   >Contact</Link>
                   <Link to='/login' className='nav-links'
                   css={{
                       marginRight: '20px'
                   }}
                   >Login</Link>
                   <Link to='/profile' className='nav-links'>Profile</Link>
                </nav>
                <div className='dropdown' onClick={this.toggleDropdown}>Menu</div>
          {this.state.dropdownView
            ? (
              <nav className='mobile-menu'
              >
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