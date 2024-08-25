import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { db } from './firebase'; // Firebase の初期化ファイルからインポート
import {
  collection,
  doc,
  setDoc,
  // getDoc, 
  onSnapshot
} from 'firebase/firestore';

function App() {
  const [count, setCount] = useState<number>(0);
  const [firestoreCount, setFirestoreCount] = useState<number | null>(null);

  // Firestore からカウントを取得し、リアルタイムで監視する
  useEffect(() => {
    const countDocRef = doc(collection(db, 'counts'), 'counter');

    // Firestore のデータをリアルタイムで監視
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setFirestoreCount(doc.data().value);
      }
    });

    return () => unsubscribe();
  }, []);

  // カウントを Firestore に保存
  const incrementCount = async () => {
    const newCount = count + 1;
    setCount(newCount);

    // Firestore にデータを保存
    const countDocRef = doc(collection(db, 'counts'), 'counter');
    await setDoc(countDocRef, { value: newCount });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Firebase</h1>
      <div className="card">
        <button onClick={incrementCount}>
          count is {count}
        </button>
        <p>Firestore count: {firestoreCount !== null ? firestoreCount : 'Loading...'}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
