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
import PostDetail from '../postDetail/PostDetail';
import Header from '../header/Header'

export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AppProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginDevelopment} />
              <Route exact path="/post-detail/:id" component={PostDetail} />
            </Switch>
          </AppProvider>
        </AuthProvider>
      </Router>
    </>
  )
}
