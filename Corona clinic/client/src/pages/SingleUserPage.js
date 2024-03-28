import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function SingleUserPage() {
  const { _id } = useParams();
  const [patient, setPatient] = useState(null);
  const [recovery, setRecovery] = useState(null);
  const [vaccinators, setVaccinators] = useState([]); // Fixed typo here
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/patient/all/${_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient');
        }
        const data = await response.json();
        setPatient(data.patient);
        setVaccinators(data.vaccinators); // Fixed variable name here
        setRecovery(data.recovery); // Fixed variable name here
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [_id]); // Include id in the dependency array

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
      {patient && (
        <div className="card">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            className="card-img-top"
            alt="profile"
            style={{ width: '100px' }} // Set inline style for width
          />
          <div className="card-body">
            <h5 className="card-title">{patient.lastName} {patient.firstName}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">ID: {patient.patientId}</li>
            <li className="list-group-item">Address: {`${patient.address.number}, ${patient.address.street}, ${patient.address.city}`}</li>
            <li className="list-group-item">Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</li>
            <li className="list-group-item">Phone Number: {patient.phoneNumber}</li>
            <li className="list-group-item">Mobile Number: {patient.mobileNumber}</li>
            <li className="list-group-item">Recovery: {recovery.positiveDate}-{recovery.recoveryDate}</li>
            <li className="list-group-item">Vaccines: {vaccinators.map((vaccine) => <p>{vaccine.vaccineDate} - {vaccine.vaccineName}</p>)}</li>
          </ul>
          <div className="card-body">
            {/* <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a> */}
          </div>
        </div>
      )}
      <Link to="/users" className="btn btn-primary">Back to All Users</Link>
    </div>
  );
}

export default SingleUserPage;
