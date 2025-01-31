// Import the functions you need from the SDKs you need
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmCbukjgeiywUn8DKSfpDh40gKlB-E9OI",
  authDomain: "projects-2025-292ac.firebaseapp.com",
  projectId: "projects-2025-292ac",
  storageBucket: "projects-2025-292ac.firebasestorage.app",
  messagingSenderId: "407077878480",
  appId: "1:407077878480:web:a462eb8a54a1961cc6fcd5",
  measurementId: "G-5BWV1B4NWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
