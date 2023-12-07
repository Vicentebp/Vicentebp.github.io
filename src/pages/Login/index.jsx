import { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import profileImg from "../../assets/profile-default.png";
import logoTexto from "../../assets/LogoTexto.png";
import logoNuvem from "../../assets/LogoNuvem.png";
import useBreakpoint from "../../hooks/useBreakPoint.jsx";
import { BsEye, BsEyeSlash, BsHouse } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { storage } from "../../services/firebaseConnection";
import { ref, uploadBytes } from "firebase/storage";

const Login = () => {
  const { phone, desktop } = useBreakpoint();
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState();
  const [initial, setInitial] = useState(true);

  const { signIn, signUp, loadingAuth, user } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) navigate("/home");
  }, [user]);
  function handlePage(type) {
    setInitial(false);
    setFormType(type);
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setProfilePhoto(null);
    setShowPassword(false);
  }

  function handleProfilePhotoChange(event) {
    const file = event.target.files[0];
    setProfileFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formType === "register") {
      if (userName !== "" && email !== "" && password !== "" && confirmPass !== "") {
        if (validPassword(password)) {
          if (password === confirmPass) {
            await signUp(capitalize(userName), profilePhoto, email, password);
            if (profileFile) {
              const storageRef = ref(storage, `/userImgs/${email}`);
              uploadBytes(storageRef, profileFile).then((snapshot) => {
                console.log("Uploaded a blob or file!");
              });
            }
          } else {
            toast.error("Passwords don't match!");
            setConfirmPass("");
          }
        } else {
          toast.error("The password must containt 6 characters, a special character, a number and a uppercase");
          setPassword("");
          setConfirmPass("");
        }
      } else {
        toast.error("All fields must be filled");
      }
    } else if (formType === "login") {
      if (email !== "" && password !== "") {
        await signIn(email, password);
      } else {
        toast.error("All fields must be filled");
      }
    }
  }

  function validPassword(senha) {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(senha);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <>
      {initial ? (
        <>
          {phone ? (
            <div className={styles.initialScreen}>
              <div className={styles.initialContent}>
                <h1>A ferramenta de organização que você precisa</h1>
                <button onClick={() => handlePage("register")} className="title-regular">
                  Criar Conta
                </button>
                <span onClick={() => handlePage("login")} className="title-regular text-high-emphasis">
                  Já tenho uma conta
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.initialScreen}>
              <img src={logoTexto} />
              <img src={logoNuvem} />
              <div className={styles.initialContent}>
                <h1>A ferramenta de organização que você precisa</h1>
                <button onClick={() => handlePage("register")} className={styles.button}>
                  Criar Conta
                </button>
                <span onClick={() => handlePage("login")} className="title-regular text-high-emphasis">
                  Já tenho uma conta
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.content}>
          <button onClick={() => navigate("/")} className={styles.backBtn}>
            <BsHouse size={25} color={"black"} />
          </button>
          <div className={styles.container}>
            <div className={styles.title}>
              <h1 className={desktop ? "display-medium" : "display-small"}>{formType === "register" ? "Welcome" : "Welcome Back"}</h1>
              <span className="body-medium">Coloque seus dados para {formType === "register" ? "criar conta." : "logar"}</span>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              {formType === "register" && (
                <>
                  <div>
                    <label htmlFor="profilePhotoInput">{profilePhoto ? <img src={profilePhoto} className={styles.profilePhoto} /> : <img src={profileImg} className={styles.profilePhoto} />}</label>
                    <input type="file" id="profilePhotoInput" accept="image/*" onChange={handleProfilePhotoChange} style={{ display: "none" }} />
                  </div>

                  <div className={styles.inputContainer}>
                    <div className={styles.inputField}>
                      {desktop && <label>Nome de usuario</label>}
                      <input type="text" className="body-medium text-primary" placeholder={`${phone ? "First Name" : ""}`} value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                  </div>
                </>
              )}
              <div className={styles.inputContainer}>
                <div className={styles.inputField}>
                  {desktop && <label>Email</label>}
                  <input type="text" className="body-medium text-primary" placeholder={`${phone ? "Email" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputField}>
                  {desktop && <label>Senha</label>}
                  <input
                    type={showPassword ? "text" : "password"}
                    className="body-medium text-primary"
                    placeholder={`${phone ? "Password" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!showPassword ? <BsEye color="#c7a0cb" size={20} onClick={() => setShowPassword(true)} /> : <BsEyeSlash color="#c7a0cb" size={20} onClick={() => setShowPassword(false)} />}
                </div>

                {formType === "register" && (
                  <div className={styles.inputField}>
                    {desktop && <label>Confirm your Password</label>}
                    <input
                      type={showPassword ? "text" : "password"}
                      className="body-medium text-primary"
                      placeholder={`${phone ? "Confirm your Password" : ""}`}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="display-small">
                {loadingAuth ? "Loading..." : `${formType === "register" ? "Register" : "Login"}`}
              </button>
            </form>
          </div>
          <span className={styles.changeType}>
            {formType === "register" ? (
              <p>
                Already have an account? <span onClick={() => handlePage("login")}>Click Here</span>
              </p>
            ) : (
              <p>
                Don't have an account? <span onClick={() => handlePage("register")}>Register Now</span>
              </p>
            )}
          </span>
        </div>
      )}
    </>
  );
};
export default Login;
