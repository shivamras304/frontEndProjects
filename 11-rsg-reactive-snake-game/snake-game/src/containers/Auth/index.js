import React, { Component } from 'react'
import styles from './index.module.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

firebase.initializeApp({
  apiKey: 'AIzaSyBc3wyVR4TULTkuiS9j1XBXQ_4ZcTGV6cY',
  authDomain: 'sr-snake-game.firebaseapp.com',
});

class Auth extends Component {

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to / after sign in is successful. Alternatively you can provide a 
    // callbacks.signInSuccessWithAuthResult function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // // Update this if needed
    // callbacks: {
    //   signInSuccessWithAuthResult: this.authSuccessfulHandler
    // }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.onAuthSuccessful(user.providerData[0])
        } else {
          this.props.onAuthFailed()
        }
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  logOutHandler = () => {
    firebase.auth().signOut()
    this.props.onAuthLogout()
  }

  render() {

    return (
      <div className={styles.AuthContainer}>
        {this.props.isSignedIn ?
          (
            <div>
              <div>Signed In!</div>
              <button onClick={this.logOutHandler}>Log out</button>
            </div>
          ) :
          (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()} />
          )  
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccessful: (user) => dispatch(actions.authSuccessful(user)),
    onAuthFailed: (user) => dispatch(actions.authFailed()),
    onAuthLogout: (user) => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)