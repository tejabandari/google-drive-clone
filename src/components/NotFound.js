import React from "react";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

function NotFound() {
  return (
    <CenteredContainer>
      <div>
        <h2>
          Nothing is here click here to go to <Link to="/">Dashboard</Link>
        </h2>
      </div>
    </CenteredContainer>
  );
}

export default NotFound;
