// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA4EYk8B-9MbBGaFL8Kp6Q_Kdi8y8dayM",
  authDomain: "todo-list-719c4.firebaseapp.com",
  projectId: "todo-list-719c4",
  storageBucket: "todo-list-719c4.appspot.com",
  messagingSenderId: "643471487567",
  appId: "1:643471487567:web:4758a2afb3f00162dcb03a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)