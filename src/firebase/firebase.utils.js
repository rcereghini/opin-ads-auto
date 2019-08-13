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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    //Commented until authentication works...
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // const userRef = firestore.doc('users/9HGkgUwVRtItcoF3jC8T');

    const snapShot = await userRef.get()

    if(!snapShot.exists){
      console.log(snapShot.data())
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider).then(console.log('cooookies!'));

  export default firebase;