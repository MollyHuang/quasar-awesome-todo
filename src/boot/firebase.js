import firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
  apiKey: "AIzaSyD43-9nIeCVQlS6Z_FO8mSh6Cjvxlh7IPo",
  authDomain: "awesome-todo-baf5f.firebaseapp.com",
  databaseURL: "https://awesome-todo-baf5f-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-baf5f",
  storageBucket: "awesome-todo-baf5f.appspot.com",
  messagingSenderId: "292208937831",
  appId: "1:292208937831:web:34c430c9fcd857dddc3dc2"
}
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }