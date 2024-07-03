import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmPriBWsgE00LAvIR9zbDARTL_XSwWSqE",
    authDomain: "trash-lyf-podcast.firebaseapp.com",
    projectId: "trash-lyf-podcast",
    storageBucket: "trash-lyf-podcast.appspot.com",
    messagingSenderId: "219286282087",
    appId: "1:219286282087:web:acbbb2dcc7e70d401fd9c2",
    measurementId: "G-4ECEQWTC32"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, storage, provider };