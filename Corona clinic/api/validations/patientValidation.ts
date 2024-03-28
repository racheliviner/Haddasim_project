import Joi, { ObjectSchema } from 'joi';
import { IPatient } from '../models/patientModel';

export const validPatient = (reqBody: IPatient): Joi.ValidationResult => {
    //This regular expression supports both Latin and Hebrew letters
    const namePattern = /^[a-zA-Z\u0590-\u05FF\s]+$/;

    const schema: ObjectSchema<any> = Joi.object({
        patientId: Joi.string().min(3).max(9).required().messages({
            'string.min': 'ID must be at least 3 characters long',
            'string.max': 'ID cannot be longer than 9 characters',
            'any.required': 'ID is required',
            'string.empty': 'ID cannot be empty'
        }),
        firstName: Joi.string().min(2).max(99).required().pattern(namePattern).messages({
            'string.min': 'First name must be at least 2 characters long',
            'string.max': 'First name cannot exceed 99 characters',
            'string.empty': 'First name cannot be empty',
            'string.pattern.base': 'First name must contain only letters'
        }),
        lastName: Joi.string().min(2).max(99).required().pattern(namePattern).messages({
            'string.min': 'Last name must be at least 2 characters long',
            'string.max': 'Last name cannot exceed 99 characters',
            'string.empty': 'Last name cannot be empty',
            'string.pattern.base': 'Last name must contain only letters'
        }),
        address: Joi.object({
            city: Joi.string().min(2).max(99).required().messages({
                'string.min': 'City name must be at least 2 characters long',
                'string.max': 'City name cannot exceed 99 characters',
                'string.empty': 'City name cannot be empty'
            }),
            street: Joi.string().min(2).max(99).required().messages({
                'string.min': 'Street name must be at least 2 characters long',
                'string.max': 'Street name cannot exceed 99 characters',
                'string.empty': 'Street name cannot be empty'
            }),
            number: Joi.number().min(0).max(999).required().messages({
                'number.min': 'Street number must be a positive number',
                'number.max': 'Street number cannot exceed 999',
                'any.required': 'Street number is required'
            }),
        }).required(),
        dateOfBirth: Joi.date().max('now').required().messages({
            'date.max': 'Date of birth cannot be in the future',
            'any.required': 'Date of birth is required',
            'date.base': 'Invalid date format'
        }),
        phoneNumber: Joi.string().min(3).max(15).required().messages({
            'string.min': 'Phone number must be at least 3 characters long',
            'string.max': 'Phone number cannot exceed 15 characters',
            'string.empty': 'Phone number cannot be empty'
        }),
        mobileNumber: Joi.string().min(3).max(15).required().messages({
            'string.min': 'Mobile number must be at least 3 characters long',
            'string.max': 'Mobile number cannot exceed 15 characters',
            'string.empty': 'Mobile number cannot be empty'
        }),
        imageUrl: Joi.string().min(2).max(999).allow('').messages({
            'string.min': 'Image URL must be at least 2 characters long',
            'string.max': 'Image URL cannot exceed 999 characters',
        }),
    });

    return schema.validate(reqBody, { abortEarly: false });
};
