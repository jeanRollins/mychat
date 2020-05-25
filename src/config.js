import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"
import 'firebase/storage'

import "firebase/analytics"



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBskOzI6esal0cwbV0nvtdvahlWyvDysoE",
    authDomain: "mychat-e42c4.firebaseapp.com",
    databaseURL: "https://mychat-e42c4.firebaseio.com",
    projectId: "mychat-e42c4",
    storageBucket: "mychat-e42c4.appspot.com",
    messagingSenderId: "559285602684",
    appId: "1:559285602684:web:859d8a48783664d8eb3cf9",
    measurementId: "G-EMG1D2FZH4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth    = firebase.auth()
const storage = firebase.storage
const db = firebase.firestore()



export {db , auth, storage};