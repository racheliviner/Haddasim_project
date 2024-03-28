import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AddVaccinatorPage() {
  const { _id } = useParams();
  const [vaccineId, setVaccineId] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [vaccineList, setVaccineList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await fetch("http://localhost:3001/vaccine/");
        if (!response.ok) {
          throw new Error("Failed to fetch vaccines");
        }
        const data = await response.json();
        setVaccineList(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVaccines();
  }, []);

  const handleAddVaccination = async () => {
    try {
      if (!vaccineId || !vaccineDate) {
        throw new Error("Please select a vaccine and enter a vaccination date");
      }

      const vaccinationData = {
        patientId: _id,
        vaccineId,
        vaccineDate,
      };

      const response = await fetch("http://localhost:3001/vaccinator/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vaccinationData),
      });

      if (!response.ok) {
        throw new Error("Failed to add vaccination");
      }

      // Clear form fields after successful addition
      setVaccineId("");
      setVaccineDate("");

      // Redirect or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Add Vaccine</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="vaccineSelect" className="form-label">
          Select Vaccine:
        </label>
        <select
          id="vaccineSelect"
          className="form-select"
          value={vaccineId}
          onChange={(e) => setVaccineId(e.target.value)}
        >
          <option value="">-- Select Vaccine --</option>
          {vaccineList.map((vaccine) => (
            <option key={vaccine._id} value={vaccine._id}>
              {vaccine.vaccineName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="vaccineDate" className="form-label">
          Vaccination Date:
        </label>
        <input
          type="date"
          className="form-control"
          id="vaccineDate"
          value={vaccineDate}
          onChange={(e) => setVaccineDate(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddVaccination}
      >
        Add
      </button>
    </div>
  );
}

export default AddVaccinatorPage;
