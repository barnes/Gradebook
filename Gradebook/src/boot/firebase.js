import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZ2dpJzaKrx54z6TvVkZ8H0xJDIeX3QJY",
    authDomain: "gradebook-123b5.firebaseapp.com",
    projectId: "gradebook-123b5",
    storageBucket: "gradebook-123b5.appspot.com",
    messagingSenderId: "1072810299529",
    appId: "1:1072810299529:web:b1e3a121c6654e44887658"


}


firebase.initializeApp(firebaseConfig)


let db = firebase.firestore()

export default db