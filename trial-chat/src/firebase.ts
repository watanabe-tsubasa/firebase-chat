// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase の設定情報
const firebaseConfig = {
  apiKey: "AIzaSyAQi8PzqthXunK_uBmJHQdQKLg1PRtVh7U",
  authDomain: "first-trial-by-chat.firebaseapp.com",
  projectId: "first-trial-by-chat",
  storageBucket: "first-trial-by-chat.appspot.com",
  messagingSenderId: "684952261836",
  appId: "1:684952261836:web:a90e6c56e647a98c989e69"
};

// Firebase アプリの初期化
const app = initializeApp(firebaseConfig);

// Firestore データベースの取得
const db = getFirestore(app);

export { db };
