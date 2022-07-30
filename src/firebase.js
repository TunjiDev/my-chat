import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDW_XERQsx8EdnazB3Cv3HE4J3qmacQ-ko",
  authDomain: "my-chat-571aa.firebaseapp.com",
  projectId: "my-chat-571aa",
  storageBucket: "my-chat-571aa.appspot.com",
  messagingSenderId: "461044943658",
  appId: "1:461044943658:web:d2887d4ee8343bc2db6c53",
  measurementId: "G-FJ2W220WDJ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, googleAuthProvider, facebookAuthProvider };
