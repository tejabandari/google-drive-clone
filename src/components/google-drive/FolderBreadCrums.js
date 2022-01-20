import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../hooks/useFolders";

function FolderBreadCrums({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb
      className="flex-grow-1 "
      listProps={{ className: "bg-white ps-0 m-0" }}
    >
      {path.map((folder, index) => {
        return (
          <Breadcrumb.Item
            key={folder.id}
            style={{ maxWidth: "150px" }}
            linkAs={Link}
            linkProps={{
              to: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            }}
            className="text-truncate d-line-block"
          >
            {folder.name}
          </Breadcrumb.Item>
        );
      })}
      <Breadcrumb.Item
        className="text-truncate d-line-block"
        style={{ maxWidth: "200px" }}
        active
      >
        {currentFolder?.name}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default FolderBreadCrums;
