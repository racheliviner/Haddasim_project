import Joi from 'joi';
import { IVaccinator } from '../models/vaccinatorModel';

export const validateVaccinator = (vaccinatorData: IVaccinator): Joi.ValidationResult => {
    const schema = Joi.object({
        patientId: Joi.string().min(3).max(30).required().messages({
            'string.min': 'Patient ID must be at least 3 characters long',
            'string.max': 'Patient ID cannot exceed 9 characters',
            'any.required': 'Patient ID is required',
            'string.empty': 'Patient ID cannot be empty'
        }),
        vaccineId: Joi.string().min(3).max(30).required().messages({
            'string.min': 'Vaccine ID must be at least 3 characters long',
            'string.max': 'Vaccine ID cannot exceed 9 characters',
            'any.required': 'Vaccine ID is required',
            'string.empty': 'Vaccine ID cannot be empty'
        }),
        vaccineDate: Joi.date().max('now').required().messages({
            'date.max': 'Vaccine date cannot be in the future',
            'any.required': 'Vaccine date is required',
            'date.base': 'Invalid date format'
        })
    });

    return schema.validate(vaccinatorData, { abortEarly: false });
};
