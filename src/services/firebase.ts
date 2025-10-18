// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg_e_ET0hPf19g8pT9Wj63jMB8S7GmMGE",
  authDomain: "mitra-ed3e9.firebaseapp.com",
  projectId: "mitra-ed3e9",
  storageBucket: "mitra-ed3e9.firebasestorage.app",
  messagingSenderId: "986482802629",
  appId: "1:986482802629:web:fe388638b464d8e09fd5ac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
