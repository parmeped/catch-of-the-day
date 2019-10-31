import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyChFWVWrEfQlDksvVk9rB1b_5s-bxmi7xE",
    authDomain: "catch-of-the-day-parmegped.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-parmegped.firebaseio.com"      
  })

const base = Rebase.createClass(firebaseApp.database())

// named export
export {firebaseApp}

export default base