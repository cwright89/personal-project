import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Contact from './Components/Contact/Contact'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/contact' component={Contact} />
        <Route path='/profile' component={Profile}/>
     </Switch>

)