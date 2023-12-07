import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "./firebaseConnection";
import { ref, uploadBytes } from "firebase/storage";

export const docUpload = async (doc) => {
  const storageRef = ref(storage, `/documentos/${doc.folder}/${doc.name}`);
  uploadBytes(storageRef, doc.file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};
