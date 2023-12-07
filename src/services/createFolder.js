import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "./firebaseConnection";
import { ref, uploadBytes } from "firebase/storage";

export const createFolder = async (doc) => {
  const storageRef = ref(storage, `/productsImg/${productInfo.name}`);
  const productsRef = collection(db, "products");
  uploadBytes(storageRef, doc.file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });

  await addDoc(productsRef, productInfo);
};
