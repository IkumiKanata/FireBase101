import logo from './logo.svg';
import './App.css';
import React from "react"
import firebase from 'firebase';

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


function App() {
  
  const hundleClickFetchButton = async () => { 
    const db = firebase.firestore();
    // document取得
  //   const doc = await db.collection("users").doc("7VHWnOzZxNsQc0ZojzhA").get();
  //   console.log(doc.data());
  //   console.log("fetch button");

    db.collection("users").get().then((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data())
      })
    })
  }
  return (
    <div className="App">
     Hello2
     <button onClick={hundleClickFetchButton}>取得</button>
    </div>

  );
}

export default App;
