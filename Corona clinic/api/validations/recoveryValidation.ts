import Joi, { ObjectSchema } from 'joi';
import { IRecovery } from '../models/recoveryModel';

export const validRecovery = (reqBody: IRecovery): Joi.ValidationResult => {
    const schema: ObjectSchema<any> = Joi.object({
        patientId: Joi.string().min(4).max(30).required(),
        positiveDate: Joi.date().required(),
        recoveryDate: Joi.date().min(Joi.ref('positiveDate')).required()
    });

    return schema.validate(reqBody);
};