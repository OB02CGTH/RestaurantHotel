import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKB7HXCmB8TGVIUqxstzG3JhKRxMlkRcg",
  authDomain: "restaurant-e109e.firebaseapp.com",
  projectId: "restaurant-e109e",
  storageBucket: "restaurant-e109e.appspot.com",
  messagingSenderId: "965310330591",
  appId: "1:965310330591:web:3a0b967cf9dc3bbc041b6a",
  measurementId: "G-3JM2YCYMKG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();