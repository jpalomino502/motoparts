import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMvMOE7N6HvvO6tszg2GdX6ACuxRXI0Zw",
  authDomain: "beta-nks.firebaseapp.com",
  projectId: "beta-nks",
  storageBucket: "beta-nks.firebasestorage.app",
  messagingSenderId: "1059482740457",
  appId: "1:1059482740457:web:7f01a8b20347c2bfbff278",
};

// Inicializar 
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, setDoc };
