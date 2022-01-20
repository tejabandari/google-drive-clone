import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function File({ file }) {
  return (
    <>
      <a
        href={`${file.url}`}
        target="_blank"
        className="btn btn-outline-dark text-truncate w-100"
      >
        <FontAwesomeIcon icon={faFile} className="me-2" />
        {file.name}
      </a>
    </>
  );
}

export default File;