import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBC68IHCg7vVp-YBeE2tBJT-o9ZExZ3JhQ",
  authDomain: "playground-3832a.firebaseapp.com",
  projectId: "playground-3832a",
  storageBucket: "playground-3832a.appspot.com",
  messagingSenderId: "763616160156",
  appId: "1:763616160156:web:73e447d96a36192ffbc059"

}


firebase.initializeApp(firebaseConfig)


let db = firebase.firestore()

export default db