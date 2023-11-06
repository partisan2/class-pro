import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const app = firebase.initializeApp({
    apiKey: "AIzaSyC0bJXziTkQr6sodqrt7OOLMOUbSviZ0B8",
    authDomain: "classpro-dev.firebaseapp.com",
    databaseURL: "https://classpro-dev-default-rtdb.firebaseio.com",
    projectId: "classpro-dev",
    storageBucket: "classpro-dev.appspot.com",
    messagingSenderId: "34543085302",
    appId: "1:34543085302:web:66859742d17994d9866ed7"
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
  })

export const auth = app.auth()
export default app
