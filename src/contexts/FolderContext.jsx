import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { getFolders } from "../services/getFolders";

export const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [folders, setFolders] = useState(null);
  const [loading, setLoading] = useState(false);
  const update = () => {
    if (user) {
      setLoading(true);
      getFolders()
        .then((data) => {
          setFolders(data);
        })
        .finally(() => setLoading(false));
    } else return "Invalid user";
  };
  useEffect(() => {
    if (!!user) {
      update({ products: true });
    }
  }, [user]);
  return <FolderContext.Provider value={{ loading, update, folders }}>{children}</FolderContext.Provider>;
};
