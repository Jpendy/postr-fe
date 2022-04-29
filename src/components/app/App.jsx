import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AuthProvider from '../../providers/AuthProvider'
import AppProvider from '../../providers/AppProvider'
import HomePage from '../../containers/homePage/HomePage';
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
import Signup from '../../containers/signup/Signup';
import Login from '../../containers/login/Login';
import UserProfile from '../../containers/userProfile/UserProfile';

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
              <Route exact path="/post-detail/:id" component={PostDetail} />
              <PrivateRoute exact path="/user-profile" component={UserProfile} />
              <PrivateRoute exact path="/create-board" component={CreateBoardPage} />
              <Route exact path="/board/:name" component={BoardPage} />
              <Route exact path="/user-page/:id" component={UserDetailPage} />
              <Route exact path="/display-name" component={SetDisplayName} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </AppProvider>
        </AuthProvider>
      </Router>
    </>
  )
}
