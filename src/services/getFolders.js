import { ref, listAll } from "firebase/storage";
import { storage } from "./firebaseConnection";
const listRef = ref(storage, "documentos/");

export const getFolders = async () => {
  const foldersList = [];
  await listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        foldersList.push(folderRef.name);
      });
      return foldersList;
    })
    .catch((error) => {
      console.log(error);
    });
  return foldersList;
};
