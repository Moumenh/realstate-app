import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyATNKOXj1Q1BTucISRHDvkCC7Fk51WL8Ew",
    authDomain: "real-estate-dev-9daac.firebaseapp.com",
    projectId: "real-estate-dev-9daac",
    storageBucket: "real-estate-dev-9daac.appspot.com",
    messagingSenderId: "277595533746",
    appId: "1:277595533746:web:7503395217f419ef9234ab"
};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase
