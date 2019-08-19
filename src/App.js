import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import GetStartedInfo from './pages/get-started-info/get-started-info.component'
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';
import SignInOnlyPage from './pages/sign-in-only/sign-in-only.component';
import SignUpOnlyPage from './pages/sign-up-only/sign-up-only.component';
import TutorialPage from './pages/tutorial/tutorial.component';


class App extends React.Component{
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
        }

       setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div>
        {/* <Header/> */}
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <p style={{ fontSize: '24px' }} onClick={() => auth.signOut()}>{this.props.currentUser ? 'Logout' : ''}</p>
        </div>
        <Switch>
          <Route exact path='/' render={() => this.props.currentUser ? <TutorialPage/> : <HomePage/>}/> 
          <Route exact path='/getstarted' component={GetStartedInfo} />'
          <Route exact path='/shop' component={ShopPage} /> 
          <Route exact exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInOnlyPage />)} /> 
          <Route exact exact path='/signup' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignUpOnlyPage />)} /> 
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
