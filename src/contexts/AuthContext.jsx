import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("FileArch");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }

    loadUser();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          userName: docSnap.data().userName,
          email: value.user.email,
          profilePhoto: docSnap.data().profilePhoto,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Welcome back!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Invalid e-mail");
            break;
          case "auth/user-not-found":
            toast.error("User not found");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password");
            break;
        }
        setLoadingAuth(false);
      });
  }

  async function signUp(userName, profilePhoto, email, password) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await setDoc(doc(db, "users", uid), {
          userName: userName,
          profilePhoto: profilePhoto,
          email: email,
        }).then(() => {
          let data = {
            uid: uid,
            userName: userName,
            email: value.user.email,
            profilePhoto: profilePhoto,
          };
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("User registrated!");
          navigate("/");
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email already in use");
            break;
          case "auth/invalid-email":
            toast.error("Invalid e-mail");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password");
            break;
          case "auth/invalid-credential":
            toast.error("Wrong password");
            break;
          default:
            console.log(error.code);
            break;
        }
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("FileArch", JSON.stringify(data));
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("FileArch");
    toast.warn("You are no longer authenticated!");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        logout,
        signUp,
        loadingAuth,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
