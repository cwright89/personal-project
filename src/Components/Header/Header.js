import { withRouter, Link } from 'react-router-dom'
import './Header.css'

const Header = props => {
    return (
        <header className='header-container'>
            <h1>Movie Blog</h1>
           
                <nav>
                    <Link to='/' className='nav-links'>Home</Link>
                    <Link to='/about' className='nav-links'>About</Link>
                    <Link to='/login' className='nav-links'>Login</Link>
                    <Link to='/profile' className='nav-links'>Profile</Link>
                </nav>
           
        </header>
    )


}

export default withRouter(Header)