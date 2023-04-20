// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAFtAC72n3eiiiAq8hLuIajnEjxcCku1hA",
    authDomain: "dispezo-chat-app-f4043.firebaseapp.com",
    projectId: "dispezo-chat-app-f4043",
    storageBucket: "dispezo-chat-app-f4043.appspot.com",
    messagingSenderId: "1087356009599",
    appId: "1:1087356009599:web:217d80fc80179be4a5d34a"
  };
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const Provider = new GoogleAuthProvider(app);
export const db  = getFirestore(app);
