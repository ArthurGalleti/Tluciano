// 1. Importe o Firestore (banco de dados)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Adicione esta linha

const firebaseConfig = {
  apiKey: "AIzaSyCP_5oQU6PM1mkCqRvvWRsAwCfaXnuAkTg",
  authDomain: "banco-de-dados-c8010.firebaseapp.com",
  projectId: "banco-de-dados-c8010",
  storageBucket: "banco-de-dados-c8010.firebasestorage.app",
  messagingSenderId: "251018199901",
  appId: "1:251018199901:web:27a5624aa2d07724f89eb4",
  measurementId: "G-Q9SGG52ZTY"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app);