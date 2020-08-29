import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './auth/Login'
import SignUp from './auth/Signup'

interface Props {
    
}

const AuthRoutes = (props: Props) => {
    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
        </Switch>
    )
}

export default AuthRoutes
