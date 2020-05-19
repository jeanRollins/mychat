import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 

import Header from './components/Header'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'

import { GetAuth} from './libs/Auth'
import { GetDocumentForId} from './libs/Firestore'
import { Loading } from './components/Loading'

function App() {

  const [ userData, setUserData ] = useState( false ) 
  const [ userFirebase , setUserFirebase ] = useState( false )

  const userGet = async (uid) => {
      const data =  await GetDocumentForId( 'users', uid )
      
      setUserFirebase(data)
  }
  const Auth = GetAuth()

  useEffect( () => {

    Auth.onAuthStateChanged( user => {
      if (user) {
        userGet(user.uid)
        setUserData(user.uid)
      }
      else {
        setUserFirebase(true)
        setUserData(null)
      }
    })
  }, [])
  
  return (
    <Router>
      { (userData !== false) && (userFirebase !== false) ? (
        <>
          <Header
            data = { userData }
            imageProfile = { userFirebase.file_profile }
          />
            <Switch>
              <Route path="/"            exact component = { Login } /> 
              <Route path="/dashboard"   exact component = { Dashboard } /> 
              <Route path = "*"  component = { PageNotFound }  />
            </Switch>
        </>
      ) : (
        <>
          <Loading/>
        </>
      )}
    </Router>
  )
    
 
}

export default App