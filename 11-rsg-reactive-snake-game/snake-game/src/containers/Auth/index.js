import React, { Component } from 'react'
import styles from './index.module.css'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: 'AIzaSyBc3wyVR4TULTkuiS9j1XBXQ_4ZcTGV6cY',
  authDomain: 'sr-snake-game.firebaseapp.com',
});

class Auth extends Component {

  state = {
    isSignedIn: false
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // Update this if needed
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div className={styles.AuthContainer}>
        {this.state.isSignedIn ?
          <div>Signed In!</div> :
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

export default Auth