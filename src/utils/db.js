// Firebase configuration and Firestore database setup
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgtJzHfn5Q6Vso5HbcQO_omhm19cDQzzk",
    authDomain: "contact-book-6fc07.firebaseapp.com",
    projectId: "contact-book-6fc07",
    storageBucket: "contact-book-6fc07.firebasestorage.app",
    messagingSenderId: "147415833790",
    appId: "1:147415833790:web:940a9b75549c2b483752ef"
  };

  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
