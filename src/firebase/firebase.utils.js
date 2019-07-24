import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDIAnTbo_Z16SrVi51TX7dXW-JN_6Sg5dQ",
    authDomain: "opin-ads.firebaseapp.com",
    databaseURL: "https://opin-ads.firebaseio.com",
    projectId: "opin-ads",
    storageBucket: "",
    messagingSenderId: "1033416647916",
    appId: "1:1033416647916:web:d569ec6aec89d748"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;