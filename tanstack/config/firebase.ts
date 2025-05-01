import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ99HNPzX9pjoRcwnxBpzM0lgawWsb9Dc",
  authDomain: "byc-project-a9908.firebaseapp.com",
  projectId: "byc-project-a9908",
  storageBucket: "byc-project-a9908.firebasestorage.app",
  messagingSenderId: "779109211911",
  appId: "1:779109211911:web:33e76f419dc870bd252fa2",
  measurementId: "G-BMSNBVMBWC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
