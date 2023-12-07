import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConnection";

export const getFiles = async (pasta) => {
  const listRef = ref(storage, `documentos/${pasta}`);
  const fileList = [];
  await listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((value) => {
          fileList.push({ fileName: itemRef.name, fileUrl: `${value}` });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return fileList;
};
