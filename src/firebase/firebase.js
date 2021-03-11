import firebase from "firebase/app"
import "firebase/auth"

const  firebaseConfig = {
  apiKey: "AIzaSyC9x8yQEcHgbI6bkaygmzdy0Wm7SMsF_bY",
  authDomain: "tuyopon-firebase101.firebaseapp.com",
  projectId: "tuyopon-firebase101",
  storageBucket: "tuyopon-firebase101.appspot.com",
  messagingSenderId: "812944710309",
  appId: "1:812944710309:web:4fa654b1e1250f83250b4c",
  measurementId: "G-E1B9XNELTD"
};

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();

 export const signupWithEmailAndPassword = async (email, password) => {
  const user = await firebase
  .auth().createUserWithEmailAndPassword(email, password);

  await firebase.auth().currentUser.sendEmailVerification();
  return user;
  // Signed in
    // ...

 }

 export const signInWithEmailAndPassword = async (email, password) => {
   const user =  firebase.auth().signInWithEmailAndPassword(email, password);
    return user;

 } 

 export const signInAnonymously =  (email, password) => {
  firebase.auth().signInAnonymously()
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

 } 