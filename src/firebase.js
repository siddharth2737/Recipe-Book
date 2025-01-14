import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAsjtEHbnqhWh6j9NaWAJngntuel-eFSFQ",
    authDomain: "food-5a6da.firebaseapp.com",
    projectId: "food-5a6da",
    storageBucket: "food-5a6da.firebasestorage.app",
    messagingSenderId: "1068144885395",
    appId: "1:1068144885395:web:6e00870ee7abfc31bd9766"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
