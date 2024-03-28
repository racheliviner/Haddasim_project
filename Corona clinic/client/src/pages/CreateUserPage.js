import React, { useState } from 'react';

function CreateUserPage() {
    const [formData, setFormData] = useState({
        patientId: '', 
        firstName: '',
        lastName: '',
        address: {
            city: '',
            street: '',
            number: '',
        },
        dateOfBirth: '',
        phoneNumber: '',
        mobileNumber: '',
        imageUrl: ''
    });

    const [errors, setErrors] = useState({
        patientId: '', // Change id to patientId
        firstName: '',
        lastName: '',
        address: {
            city: '',
            street: '',
            number: '',
        },
        dateOfBirth: '',
        phoneNumber: '',
        mobileNumber: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validations
        if (!formData.patientId.trim()) { // Change id to patientId
            newErrors.patientId = 'ID is required'; // Change id to patientId
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }
        if (!formData.address || !formData.address.city.trim()) {
            newErrors.address = {
                ...newErrors.address,
                city: 'City is required'
            };
        }
        if (!formData.address || !formData.address.street.trim()) {
            newErrors.address = {
                ...newErrors.address,
                street: 'Street is required'
            };
        }
        if (!formData.address || !formData.address.number.trim()) {
            newErrors.address = {
                ...newErrors.address,
                number: 'Street number is required'
            };
        } else if (isNaN(formData.address.number.trim())) {
            newErrors.address = {
                ...newErrors.address,
                number: 'Number must be a valid number'
            };
        }
        if (!formData.dateOfBirth.trim()) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        }
        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile Number is required';
        }
        setErrors(newErrors);

        // If no errors, submit form
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:3001/patient/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                // Reset form after successful submission
                setFormData({
                    patientId: '', // Change id to patientId
                    firstName: '',
                    lastName: '',
                    address: {
                        city: '',
                        street: '',
                        number: '',
                    },
                    dateOfBirth: '',
                    phoneNumber: '',
                    mobileNumber: '',
                    imageUrl: ''
                });
                alert('User created successfully!');
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Create User Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">ID:</label>
                    <input type="text" className="form-control" name="patientId" value={formData.patientId} onChange={handleChange} /> {/* Change id to patientId */}
                    {errors.patientId && <span style={{ color: 'red' }}>{errors.patientId}</span>} {/* Change id to patientId */}
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name:</label>
                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name:</label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">City:</label>
                    <input type="text" className="form-control" name="address.city" value={formData.address ? formData.address.city : ''} onChange={handleChange} />
                    {errors.address?.city && <span style={{ color: 'red' }}>{errors.address.city}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Street:</label>
                    <input type="text" className="form-control" name="address.street" value={formData.address ? formData.address.street : ''} onChange={handleChange} />
                    {errors.address && errors.address.street && <span style={{ color: 'red' }}>{errors.address.street}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Street Number:</label>
                    <input type="text" className="form-control" name="address.number" value={formData.address ? formData.address.number : ''} onChange={handleChange} />
                    {errors.address && errors.address.number && <span style={{ color: 'red' }}>{errors.address.number}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    {errors.dateOfBirth && <span style={{ color: 'red' }}>{errors.dateOfBirth}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number:</label>
                    <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile Number:</label>
                    <input type="text" className="form-control" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                    {errors.mobileNumber && <span style={{ color: 'red' }}>{errors.mobileNumber}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL:</label>
                    <input type="text" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    {errors.imageUrl &&
                        <span style={{ color: 'red' }}>{errors.imageUrl}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Create User</button>
            </form>
        </div>
    );
}

export default CreateUserPage;