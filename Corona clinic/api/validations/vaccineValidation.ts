import Joi from 'joi';
import { IVaccine } from '../models/vaccineModel';

export const validateVaccine = (vaccineData: IVaccine): Joi.ValidationResult => {
    const schema = Joi.object({
        vaccineId: Joi.string().min(3).max(9).required().messages({
            'string.min': 'Vaccine ID must be at least 3 characters long',
            'string.max': 'Vaccine ID cannot exceed 9 characters',
            'any.required': 'Vaccine ID is required',
            'string.empty': 'Vaccine ID cannot be empty'
        }),
        vaccineName: Joi.string().min(2).max(50).required().messages({
            'string.min': 'Vaccine name must be at least 2 characters long',
            'string.max': 'Vaccine name cannot exceed 50 characters',
            'any.required': 'Vaccine name is required',
            'string.empty': 'Vaccine name cannot be empty'
        })
    });

    return schema.validate(vaccineData, { abortEarly: false });
};
