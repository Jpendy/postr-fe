import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AuthProvider from '../../providers/AuthProvider'
import AppProvider from '../../providers/AppProvider'
import HomePage from '../../containers/homePage/HomePage';
import LoginDevelopment from './LoginDevelopment'
import PostDetail from '../../containers/postDetail/PostDetail';
import Header from '../header/Header'
import CreateBoardPage from '../../containers/createBoardPage/CreateBoardPage';
import BoardPage from '../../containers/boardPage/BoardPage';
import UserDetailPage from '../../containers/userDetailPage/UserDetailPage';
import './App.css'
import CreatePost from '../createPost/CreatePost';
import SetDisplayName from '../../containers/setDisplayName/SetDisplayName';
import PrivateRoute from '../privateRoute/PrivateRoute';
import CheckForDisplayName from '../../wrappers/CheckForDisplayName';

export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AppProvider>
            <CheckForDisplayName />
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginDevelopment} />
              <Route exact path="/post-detail/:id" component={PostDetail} />
              <PrivateRoute exact path="/create-board" component={CreateBoardPage} />
              <Route exact path="/board/:name" component={BoardPage} />
              <Route exact path="/user-page/:id" component={UserDetailPage} />
              <Route exact path="/display-name" component={SetDisplayName} />

            </Switch>
          </AppProvider>
        </AuthProvider>
      </Router>
    </>
  )
}
