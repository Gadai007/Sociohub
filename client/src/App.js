import React from 'react'
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import PrivateRoute from './helper/PrivateRoute'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Profile from './components/Profile'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import Error from './components/Error'
import UserProfile from './components/UserProfile'
import FollowingPosts from './components/FollowingPosts'
import Reset from './components/Reset'
import NewPassword from './components/NewPassword'
import './App.css';

const store = configureStore()

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <PrivateRoute exact path='/followingpost' component={FollowingPosts}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/signin' component={Signin}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
        <Route exact path='/reset' component={Reset}/>
        <Route exact path='/reset/:token' component={NewPassword}/>
        <PrivateRoute exact path='/profile/:profileId' component={UserProfile}/>
        <PrivateRoute exact path='/createpost' component={CreatePost}/>
        <PrivateRoute  component={Error}/>
      </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
