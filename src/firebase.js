// src/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyCQvYTyNarG_Ey4RIMxdaQXNlo2m1GKTKU",
  authDomain: "codequestapp-faeb7.firebaseapp.com",
  projectId: "codequestapp-faeb7",
  storageBucket: "codequestapp-faeb7.firebasestorage.app",
  messagingSenderId: "372249294624",
  appId: "1:372249294624:web:6f6f6f75a6171cfb98c945"
//   measurementId: "G-ZLFHT3G9YW"
};

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
