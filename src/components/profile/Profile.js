import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "../CenteredContainer";

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  function handleLogout() {
    setError("");
    logout()
      .then(() => {
        setError("");
        navigate("/login");
      })
      .cath((e) => {
        setError("Failed to logout");
      });
  }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser?.email}
                disabled
                required
              />
            </Form.Group>
          </Form>
          <Link to="/update-profile" className="btn btn-primary mt-3 w-100">
            Update profile
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </CenteredContainer>
  );
}

export default Profile;
