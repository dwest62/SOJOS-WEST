
import React, { useEffect } from 'react'
import Logo from './Components/Logo'
import LoginForm from './Components/LoginForm'
import Gathering from './Components/Gathering'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser} from './reducers/userReducer'
import { initializeGatherings } from './reducers/gatheringReducer'
import { initializeUsers } from './reducers/usersReducer'
import GatheringForm from './Components/GatheringForm'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import GatheringEdit from './Components/GatheringEdit'
import Navigation from './Components/Navigation'
import ArchivedGatherings from './Components/ArchivedGathering'
import HomePage from './Components/HomePage'
import { sortByDate } from './Components/listHelper'
import HomeDefault from './Components/HomeDefault'

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
  
  const gatheringToEditMatch = useRouteMatch('/update-gatherings/:id')
  const gatheringMatch = useRouteMatch('/gathering/:id')

  const gatheringPosted = sortByDate(gatherings)

  if(!user.user){
    return(
      <div>
        <Logo />
        <LoginForm />
      </div>
    )
  } else if(gatherings && users){
    const gatheringToEdit = gatheringToEditMatch
      ? gatherings.find(data => data.id === gatheringToEditMatch.params.id)
      : null
    const gathering = gatheringMatch
      ? gatherings.find(data => data.id === gatheringMatch.params.id)
      : null
    return(
      <div>
          <Navigation />
        <Switch>
            <Route path='/new-gathering'>
              <GatheringForm />
            </Route>
            <Route path='/update-gatherings/:id'>
              <GatheringEdit gathering={gatheringToEdit}/>
            </Route>
            <Route path='/archived-gatherings'>
              <ArchivedGatherings/>
            </Route>
            <Route path='/gathering/:id'>
              <Gathering gathering={gathering}/>
            </Route>
            <Route path='/'>
              <div className='gatheringMain'>
                {
                  gatheringPosted[0]
                    ? <HomePage />
                    : <HomeDefault/>
                }
              </div>
            </Route>
          </Switch>
        </div>
    )
  } else { return null}
}

export default App