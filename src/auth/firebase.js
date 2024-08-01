// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIT15Ksx0Yj5ljKlBG46VGVAXMf47KrrU",
  authDomain: "bookauth-3aef3.firebaseapp.com",
  projectId: "bookauth-3aef3",
  storageBucket: "bookauth-3aef3.appspot.com",
  messagingSenderId: "758798572119",
  appId: "1:758798572119:web:bce0f17c3257b83928a112",
  measurementId: "G-XNL0YW7K5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);