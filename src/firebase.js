import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "AIzaSyC0bJXziTkQr6sodqrt7OOLMOUbSviZ0B8",
    authDomain: "classpro-dev.firebaseapp.com",
    databaseURL: "https://classpro-dev-default-rtdb.firebaseio.com",
    projectId: "classpro-dev",
    storageBucket: "classpro-dev.appspot.com",
    messagingSenderId: "34543085302",
    appId: "1:34543085302:web:66859742d17994d9866ed7"
  })

export const auth = app.auth()
export const db = getFirestore(app)
export const storage = getStorage(app);
export default app
