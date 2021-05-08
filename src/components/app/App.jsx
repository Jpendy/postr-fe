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
              <Route exact path="/create-board" component={CreateBoardPage} />
              <Route exact path="/board/:name" component={BoardPage} />
              <Route exact path="/user-page/:id" component={UserDetailPage} />
              <Route exacgt path="/uploader" component={CreatePost} />
            </Switch>
          </AppProvider>
        </AuthProvider>
      </Router>
    </>
  )
}
