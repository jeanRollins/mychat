import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"
import 'firebase/storage'

import "firebase/analytics"



// Your web app's Firebase configuration
const firebaseConfig = {

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth    = firebase.auth()
const storage = firebase.storage
const db = firebase.firestore()



export {db , auth, storage};