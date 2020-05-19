import {auth} from '../config'
import { auth as authorize } from 'firebase'


export async  function validate(email, password){
  const response = await auth.signInWithEmailAndPassword(email, password)
  return response
}

export   function GetAuth  () {
  return  authorize()
} 

export async function logout(props){
  await auth.signOut()
}

export async function observer(){
  await auth.onAuthStateChanged( function( user ) {
    if (user) {
      
      return user
    }
    else {
      return false
    }
  })
}

export async function isAuthPage() {
  const dataUser = await auth.currentUser
  console.log( 'dataUser' , dataUser )
  return dataUser
}
