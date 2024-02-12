// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqeXaL61hSxocQS6bRk48u3p9X-V_onp8",
  authDomain: "poultrymax-pulangi.firebaseapp.com",
  projectId: "poultrymax-pulangi",
  storageBucket: "poultrymax-pulangi.appspot.com",
  messagingSenderId: "483538980580",
  appId: "1:483538980580:web:bafbe06081cc1fbe9b66f1",
  databaseURL: "https://poultrymax-pulangi-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app,db, ref, push ,set};