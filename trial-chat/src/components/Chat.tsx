// src/Chat.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";

interface newMessageType {
  name: string;
  message: string;
}

interface messageType {
  id: string;
  timestamp: Timestamp;
  text: {
    name: string;
    message: string;
  }
}

export const Chat = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [newMessage, setNewMessage] = useState<newMessageType>({name: "", message: ""});

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as messageType[];
      console.log(messagesData)
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.message.trim()) {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage({name: "", message: ""});
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMessage(current => ({
      ...current,
      [name]: value
    }))
  }

  return (
    <div>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.text.name}: {message.text.message}</p>
        ))}
      </div>
      <input
        name="name"
        value={newMessage.name}
        onChange={handleInput}
        placeholder="名前を入力"
      />
      <input
        name="message"
        value={newMessage.message}
        onChange={handleInput}
        placeholder="メッセージを入力"
      />
      <button onClick={sendMessage}>送信</button>
    </div>
  );
};