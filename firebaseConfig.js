// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';  // Firestore
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAL9vPIqUclomq5rOT9lv_6aGdaCSHzg-w",
  authDomain: "expensetrackersystem-f4d9a.firebaseapp.com",
  projectId: "expensetrackersystem-f4d9a",
  storageBucket: "expensetrackersystem-f4d9a.firebasestorage.app",
  messagingSenderId: "817268557881",
  appId: "1:817268557881:web:c7acb2c81111c0ef0ae5e8",
  measurementId: "G-BCFR778FSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore setup
const storage = getStorage(app);  // Firebase Storage setup

export { db, storage, ref, uploadBytes, getDownloadURL, collection, addDoc };

