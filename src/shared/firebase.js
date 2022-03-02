import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0ULJ_TmRA84RcnIjDAnBTra2lpGCZTV8",
  authDomain: "modelanswer-5d816.firebaseapp.com",
  projectId: "modelanswer-5d816",
  storageBucket: "modelanswer-5d816.appspot.com",
  messagingSenderId: "510223324102",
  appId: "1:510223324102:web:b64e0b10c6f4734e8d98c7",
  measurementId: "G-YMXEF86ECP",

};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export{auth, apiKey, firestore, storage, realtime};