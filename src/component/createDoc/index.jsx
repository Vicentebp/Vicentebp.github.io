import { docUpload } from "../../services/docUpload";
import styles from "./style.module.scss";

import { FolderContext } from "../../contexts/FolderContext";
import { useContext, useEffect, useState } from "react";
import { getFiles } from "../../services/getFiles";
const CreateDoc = () => {
  const { folders, loading } = useContext(FolderContext);
  const [loading2, setLoading2] = useState(false);
  const [pasta, setPasta] = useState(null);
  const [files, setFiles] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const files = e.target.docFiles.files;
    for (const file of files) {
      const fileInfo = {
        name: file.name,
        file: file,
        folder: e.target.docFolder.value,
      };
      await docUpload(fileInfo).then(() => alert("Documento registrado com sucesso"));
    }
  };
  const handleSelectPasta = (e) => {
    setPasta(e.target.value);
  };
  useEffect(() => {
    if (pasta) {
      setLoading2(true);
      getFiles(pasta)
        .then((value) => setFiles(value))
        .finally(() => setLoading2(false));
      console.log(files + " no create doc omponente");
    }
  }, [folders, pasta]);
  return (
    <div className={styles.createDocWrapper}>
      <div>
        {!loading && !loading2 && folders != null && (
          <div>
            <div className={styles.folderContainer}>
              <span className={styles.fontSpan}>Suas Pastas:</span>
              {folders.map((e) => (
                <button onClick={handleSelectPasta} className={`${styles.fontSpan} ${styles.btn}`} value={e} key={e} style={{ cursor: "pointer" }}>
                  {e}
                </button>
              ))}
            </div>
            {!loading && !loading2 && files && (
              <div className={styles.folderContainer}>
                <span className={styles.fontSpan}>Pasta selecionada: {pasta}</span>
                <span className={styles.fontSpan}>Arquivos da pasta selecionada:</span>
                {files.map((e) => (
                  <a href={e.fileUrl} download={e.fileName} className={styles.fontSpan} key={e.fileName} style={{ cursor: "pointer" }}>
                    {e.fileName}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <form onSubmit={submitHandler} className={styles.formWrapper}>
          <div className={styles.labelWrapper}>
            <label htmlFor="docName">Nome do documento</label>
            <input required type="text" id="docName"></input>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="docFolder">Nome da pasta</label>
            <input required type="text" id="docFolder"></input>
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="docFiles">O documento</label>
            <input required type="file" id="docFiles" accept=".odt,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></input>
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
export default CreateDoc;
