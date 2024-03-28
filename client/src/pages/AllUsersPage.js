import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllUsersPage() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/patient/");
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
        {patients.map((patient) => (
          <div key={patient.patientId} className="col">
            <Link
              to={`/users/${patient._id}`} //to change
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  className="card-img-top"
                  alt="profile"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {patient.firstName} {patient.lastName}
                  </h5>
                  <div className="d-grid gap-2">
                    <Link
                      to={`/vaccinator/${patient._id}`}
                      className="btn btn-primary"
                      style={{ backgroundColor: "green" }} 
                    >
                      Add vaccine
                    </Link>
                    <Link
                      to={`/recovery/${patient._id}`}
                      className="btn btn-primary"
                      style={{ backgroundColor: "blue" }} 
                    >
                      Add recovery
                    </Link>
                    <Link
                      to={`/edit/${patient.patientId}`}
                      className="btn btn-primary"
                      style={{ backgroundColor: "orange" }}
                    >
                      Edit user
                    </Link>
                    <Link
                      to={`/delete/${patient.patientId}`}
                      className="btn btn-primary"
                      style={{ backgroundColor: "red" }} 
                    >
                      Delete user
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsersPage;
