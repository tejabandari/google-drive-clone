import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../hooks/useFolders";
function AddNewFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const path = [...currentFolder.path];
    if (currentFolder != ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    database.folders.add({
      name: folderName,
      userId: currentUser.uid,
      parentId: currentFolder.id,
      path: path,
      createdAt: database.getCurrentTimeStamp(),
    });
    setFolderName("");
    closeModal();
  }
  return (
    <>
      <Button variant="outline-success" onClick={openModal}>
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                value={folderName}
                required
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddNewFolderButton;
