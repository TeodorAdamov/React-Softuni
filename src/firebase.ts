// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, query, where, orderBy } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0H08odre50Mxa7ofmLoaB3INh6pF1Lz4",
    authDomain: "react-app-33dbc.firebaseapp.com",
    projectId: "react-app-33dbc",
    storageBucket: "react-app-33dbc.appspot.com",
    messagingSenderId: "180878413687",
    appId: "1:180878413687:web:cc2f6cacf6a1827f381b72"
};

const COLLECTIONS = {
    PRODUCTS: 'products',
    MESSAGES: 'messages'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);
const getAllItemsFromCollection = () => collection(firestore, COLLECTIONS.PRODUCTS);
const documentByIdRef = (id: string) => doc(firestore, 'products', id);
const firebaseStorage = getStorage(app)
const storageRef = (imageName: string) => ref(firebaseStorage, imageName);
const specificItemsByEmail = (email: string) => query(collection(firestore, COLLECTIONS.PRODUCTS), where('email', '==', email));
const getMessagesForChat = (adId: string) => query(collection(firestore, COLLECTIONS.MESSAGES),
    where('adId', '==', adId),
    orderBy('timestamp', 'asc'))
export {
    firebaseAuth,
    firestore,
    firebaseStorage,
    storageRef,
    getAllItemsFromCollection,
    documentByIdRef,
    specificItemsByEmail,
    getMessagesForChat
}