import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import firebase from 'firebase';
import  {signupWithEmailAndPassword, signInWithEmailAndPassword} from "./firebase/firebase"

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("")
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState();
  // const [documentId, setDocumentId]

  const handleClickFetchButton = async () => { 
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

  const handleClickAddButton = async () => {
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
     //setの場合はdocに自らidを割り振る
    .add({
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

  const handleClickDeteleButton = async () => {
    const db = firebase.firestore();
    const dt = db.collection("users").doc("1").delete();
  }

  // useEffect(() => {
  //   const db = firebase.firestore();
  //   const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
  //     console.log("検知！！")
  //     // querySnapshot.forEach(doc)
  //   })
  //   return () => {
  //     cleanup
  //   }
  // }, [input])
  const userListItems = users.map(user => {
    return (
      <li key={user.userId}>{user.name} : {user.age} : {user.location} </li>
    )
  })

  const signup = async (event) => {
    event.preventDefault(); //webページの再読み込みを行わない
    console.log("email:",email );
    console.log("password:",password );
    const user = await signupWithEmailAndPassword(email, password);
    console.log("登録user情報:",user);
  }

  const signin = async (event) => {
    event.preventDefault(); //webページの再読み込みを行わない
    console.log("email:",email );
    console.log("password:",password );
    const user = await signInWithEmailAndPassword(email, password);
    console.log("サインインuser情報:",user);

  }
  return (
    <div className="App">
     <div>Hello2</div>
     <h1>Auth動作確認</h1>
     <form onSubmit={signup}>
       <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
       <input type="password" value={password} onChange={(event) => setPassWord(event.target.value)}></input>
       <button type={"submit"}>登録</button>
     </form>
     <form onSubmit={signin}>
       <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
       <input type="password" value={password} onChange={(event) => setPassWord(event.target.value)}></input>
       <button type={"submit"}>ログイン</button>
     </form>
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
     <button onClick={handleClickFetchButton}>取得</button>
     <button onClick={handleClickAddButton}>追加</button>
     <button onClick={handleClickDeteleButton}>削除</button>
     <ul>{userListItems}</ul>
    </div>

  );
  }
