import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AddNewFolderButton from "./AddNewFolderButton";
import NavbarElement from "./Navbar";
import { useParams, useLocation } from "react-router-dom";
import { useFolder } from "../hooks/useFolders";
import Folder from "./Folder";
import FolderBreadCrums from "./FolderBreadCrums";
import AddNewFileButton from "./AddNewFileButton";
import File from "./File";

function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state?.folder
  );
  return (
    <>
      <NavbarElement />
      <Container fluid>
        <div className="d-flex align-items-center mt-1">
          <FolderBreadCrums currentFolder={folder} />
          <AddNewFileButton currentFolder={folder} />
          <AddNewFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              return (
                <div
                  key={childFolder.id}
                  className="p-1"
                  style={{ maxWidth: "200px" }}
                >
                  <Folder folder={childFolder} />
                </div>
              );
            })}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => {
              return (
                <div
                  key={childFile.id}
                  className="p-1"
                  style={{ maxWidth: "200px" }}
                >
                  <File file={childFile} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
