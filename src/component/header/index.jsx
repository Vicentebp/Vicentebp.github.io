import styles from "./style.module.scss";
import logoTexto from "../../assets/LogoTexto.png";
import logoNuvem from "../../assets/LogoNuvem.png";
import { IoDocument } from "react-icons/io5";
import { FaRegUserCircle, FaCalendarAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogOut = (e) => {
    logout();
    navigate("/login");
  };
  return (
    <header className={styles.header}>
      <div className={styles.iconWrapper}>
        <img src={logoTexto} height={"100%"} />
        <img src={logoNuvem} />
      </div>
      <div className={styles.iconWrapper}>
        <div className={styles.actionWrapper}>
          <IoDocument className={styles.icons}></IoDocument>
          <span>Documentos</span>
        </div>
        <div className={styles.actionWrapper}>
          <FaCalendarAlt className={styles.icons}></FaCalendarAlt>
          <span>Calendario</span>
        </div>
        <div className={styles.actionWrapper}>
          <FaRegUserCircle className={styles.icons}></FaRegUserCircle>
          <span>Perfil</span>
        </div>
        <div className={styles.actionWrapper} onClick={handleLogOut}>
          <MdLogout className={styles.icons}></MdLogout>
          <span>LogOut</span>
        </div>
      </div>
    </header>
  );
};
export default Header;
