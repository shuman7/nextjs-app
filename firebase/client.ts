import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD-RhJvMI7SevvkGlGZc0ViUbe5XXuz-JU",
  authDomain: "fir-dev-70d51.firebaseapp.com",
  projectId: "fir-dev-70d51",
  storageBucket: "fir-dev-70d51.appspot.com",
  messagingSenderId: "142705184936",
  appId: "1:142705184936:web:c7bb2ae6cce7672535729d",
  measurementId: "G-1PEXCKY0BK"
};

// Initialize Firebase 初期化されていたら呼ばない
if(!getApps()?.length){
    initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const db = getFirestore();