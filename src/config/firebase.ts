import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your Firebase config (you'll need to replace these with your actual values)
const firebaseConfig = {
    apiKey: "AIzaSyDymkVwIJKZLrn7yH3eBVOulIYSfraSDTE",
    authDomain: "video-portfolio-8ea31.firebaseapp.com",
    projectId: "video-portfolio-8ea31",
    storageBucket: "video-portfolio-8ea31.firebasestorage.app",
    messagingSenderId: "318777328287",
    appId: "1:318777328287:web:751ae519bf93291a7158aa",
    measurementId: "G-TDJDS1KEWD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app; 