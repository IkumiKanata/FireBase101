import logo from './logo.svg';
import './App.css';
import React, {useState} from "react"
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
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState();

  const hundleClickFetchButton = async () => { 
    const db = firebase.firestore();
    // document取得
  //   const doc = await db.collection("users").doc("7VHWnOzZxNsQc0ZojzhA").get();
  //   console.log(doc.data());
  //   console.log("fetch button");

  //collection 取得
    const snapshot = await db.collection("users")
    .get();
    const _users = [];
      snapshot.forEach(doc => {
       _users.push({
         userId: doc.id,
         ...doc.data()
       })
      })
    setUsers(_users)
  }

  const hundleClickAddButton = async () => {
    if(!userName || !age) {
      alert('"userName" or "age"がからです' );
      return;
    }
    const parseAge = parseInt(age,10);

    if( isNaN(parseAge) ) { //parseIntができてない
      alert('number は半角の数値でセットしてください');
      return;　
    }


    const db = firebase.firestore();
    await db 
    .collection("users")
    .doc("1") //setの場合はdocに自らidを割り振る
    .set({
      name: userName,
      age: age
    }, {merge:true}); //mergeは全体書き換えを阻止し、追加、変更要素のみ
    // .add({　自動で
    //   // name: "Dummy",
    //   age: 1
    // }, {merge:true});

    setUserName('');
    setAge('');
    }


  const userListItems = users.map(user => {
    return (
      <li key={user.userId}>{user.name} : {user.age} : {user.location} </li>
    )
  })
  return (
    <div className="App">
     <div>Hello2</div>
     <div>
       <label htmlFor="username">UserName : </label>
       <input
        type="text"
        id="username"
        value={userName}
        onChange={(event) => {setUserName(event.target.value)}}
       ></input>
       <label htmlFor="age">age : </label>
       <input
        type="text"
        id="age"
        value={age}
        onChange={(event) => {setAge(event.target.value)}}
       ></input>

     </div>
     <button onClick={hundleClickFetchButton}>取得</button>
     <button onClick={hundleClickAddButton}>追加</button>
     <ul>{userListItems}</ul>
    </div>

  );
}

export default App;
