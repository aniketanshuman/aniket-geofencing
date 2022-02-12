
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzTkCPNwCAvy0Fk59PEKS0a87Me6_e0C4",
  authDomain: "aniket-geofencing.firebaseapp.com",
  projectId: "aniket-geofencing",
  storageBucket: "aniket-geofencing.appspot.com",
  messagingSenderId: "443863117491",
  appId: "1:443863117491:web:7db6200c0a79bf0a1f8ac6",
  measurementId: "G-G4R2PBS919"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;