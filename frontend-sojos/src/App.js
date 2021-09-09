
import React, { useEffect } from 'react'
import Logo from './Components/Logo'
import LoginForm from './Components/LoginForm'
import Gathering from './Components/Gathering'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logout } from './reducers/userReducer'
import { Button, Container } from '@material-ui/core'
import { initializeGatherings } from './reducers/gatheringReducer'
import { initializeUsers } from './reducers/usersReducer'
import GatheringForm from './Components/GatheringForm'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import GatheringEdit from './Components/GatheringEdit'
import Navigation from './Components/Navigation'

const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initializeUser())
  }, [dispatch])
  
  useEffect( () => {
    dispatch(initializeGatherings())
  }, [dispatch])

  useEffect( () => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const gatherings = useSelector(state => state.gatherings)
  const users = useSelector(state => state.users)
  
  const match = useRouteMatch('/update-gatherings/:id')
  
  if(!user.user){
    return(
      <div>
        <Logo />
        <LoginForm />
      </div>
    )
  } else if(gatherings && users){
    const gathering = match
      ? gatherings.find(data => data.id === match.params.id)
      :null
    return(
      <div>
          <Navigation />
        <Switch>
            <Route path='/new-gathering'>
              <GatheringForm />
            </Route>
            <Route path='/update-gatherings/:id'>
              <GatheringEdit gathering={gathering}/>
            </Route>
            <Route path='/'>
              <div id='gathering'>
                <Gathering />
              </div>
            </Route>
          </Switch>
        </div>
    )
  } else { return null}
}

export default App