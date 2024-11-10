import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCQj4CtQix41G_q_KHCKrWkCafoBkcm_w",
  authDomain: "webnova-nks.firebaseapp.com",
  projectId: "webnova-nks",
  storageBucket: "webnova-nks.firebasestorage.app",
  messagingSenderId: "1011049946794",
  appId: "1:1011049946794:web:052c0e074ac471075abad3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, setDoc, ref, uploadBytesResumable, getDownloadURL };
