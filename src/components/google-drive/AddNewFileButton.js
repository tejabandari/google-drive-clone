import React, { useState } from "react";
import ReactDOM from "react-dom";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { database, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../hooks/useFolders";
import { Toast, ProgressBar } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

function AddNewFileButton({ currentFolder }) {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);

  function handleUpload(e) {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;
    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.map((path) => path.name).join("/")}/${
            file.name
          }`
        : `${currentFolder.path.map((path) => path.name).join("/")}/${
            currentFolder.name
          }/${file.name}`;
    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id == id) return { ...uploadFile, error: true };
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id != id;
          });
        });
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createAt: database.getCurrentTimeStamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }
  return (
    <label className="btn btn-outline-success me-2">
      <FontAwesomeIcon icon={faFileUpload} />
      <input
        type="file"
        name=""
        id=""
        onChange={handleUpload}
        style={{ opacity: "0", position: "absolute", left: "-9999px" }}
      />
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => {
              return (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles) => {
                      return prevUploadingFiles.filter((uploadFile) => {
                        return uploadFile.id != file.id;
                      });
                    });
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar
                      variant={file.error ? "danger" : "primary"}
                      animated={!file.error}
                      label={
                        file.error
                          ? "Error"
                          : `${Math.round(file.progress * 100)}`
                      }
                      now={file.progress * 100}
                    />
                  </Toast.Body>
                </Toast>
              );
            })}
          </div>,
          document.body
        )}
    </label>
  );
}

export default AddNewFileButton;
