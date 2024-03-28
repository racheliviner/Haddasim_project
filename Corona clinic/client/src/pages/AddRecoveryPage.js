import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddRecoveryPage() {
    const { _id } = useParams();
    const [positiveDate, setPositiveDate] = useState('');
    const [recoveryDate, setRecoveryDate] = useState('');
    const [error, setError] = useState('');

    const handleAddRecovery = async () => {
        try {
            // Validate input
            if (!positiveDate || !recoveryDate) {
                throw new Error('Please enter both positive date and recovery date');
            }

            // Create recovery object
            const recoveryData = {
                patientId: _id,
                positiveDate,
                recoveryDate
            };
            // Send POST request to add recovery
            const response = await fetch('http://localhost:3001/recovery/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recoveryData)
            });

            // Check if request was successful
            if (!response.ok) {
                throw new Error('Failed to add recovery');
            }

            // Redirect to some page after successful addition
            window.location.href = '/'; // Redirect to the home page

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Add Recovery</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="mb-3">
                <label htmlFor="positiveDate" className="form-label">Date of receiving a positive result:</label>
                <input type="date" className="form-control" id="positiveDate" value={positiveDate} onChange={(e) => setPositiveDate(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="recoveryDate" className="form-label">Recovery date:</label>
                <input type="date" className="form-control" id="recoveryDate" value={recoveryDate} onChange={(e) => setRecoveryDate(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddRecovery}>Add</button>
        </div>
    );
}

export default AddRecoveryPage;
