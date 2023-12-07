import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAaFzMTukeVJMX9v_9dHg_6-n50p0I5A0I",
  authDomain: "archive-file-cloud.firebaseapp.com",
  projectId: "archive-file-cloud",
  storageBucket: "archive-file-cloud.appspot.com",
  messagingSenderId: "1082935632590",
  appId: "1:1082935632590:web:15bd2610f1c9bf7e74269f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
