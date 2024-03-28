import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DeleteUserPage() {
  const { patientId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/patient/${patientId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [patientId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/patient/${patientId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Handle success
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h1>Delete User</h1>
      <p>Are you sure you want to delete {user.firstName} {user.lastName}?</p>
      <button onClick={handleDelete} style={{ backgroundColor: "#f44336", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Delete</button>
    </div>
  );
}

export default DeleteUserPage;
