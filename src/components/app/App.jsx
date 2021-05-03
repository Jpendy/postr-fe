import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AuthProvider from '../../providers/AuthProvider'
import AppProvider from '../../providers/AppProvider'
import HomePage from '../../containers/HomePage';
import LoginDevelopment from './LoginDevelopment'

export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginDevelopment} />
            </Switch>
          </AppProvider>
        </AuthProvider>
      </Router>
    </>
  )
}
