import CreateDoc from "../../component/createDoc";
import Header from "../../component/header";

import styles from "./style.module.scss";
const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <Header></Header>

      <CreateDoc></CreateDoc>
    </div>
  );
};
export default Home;
