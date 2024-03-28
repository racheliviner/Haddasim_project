import { Request, Response } from 'express';
import { PatientModel } from '../models/patientModel';
import { validPatient } from '../validations/patientValidation';
import { RecoveryModel } from '../models/recoveryModel';
import { VaccinatorModel } from '../models/vaccinatorModel';
import { VaccineModel } from '../models/vaccineModel';

export const patientController = {

  getAllPatientInfo: async (req: Request, res: Response) => {
    const { patientId } = req.params;

    try {
      const patient = await PatientModel.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      let recovery = await RecoveryModel.findOne( {patientId});
      if (!recovery) {
        recovery = null;
      }
      let vaccinators1 = await VaccinatorModel.find({ patientId});
      
      let vaccinators: any[] = [];
      if (!vaccinators1 || vaccinators1.length === 0) {
        vaccinators1 = []
      } else {
        vaccinators = await Promise.all(vaccinators1.map(async (v) => {
          let vac = await VaccineModel.findById(v.vaccineId)
          if(!vac?.vaccineName)
          {
            return {_id: v._id, vaccineDate: v.vaccineDate}
          }
          console.log(vac);
          
          return {_id: v._id, vaccineDate: v.vaccineDate,vaccineName: vac.vaccineName}
        }));
      }

      const patientInfo = {
        patient,
        recovery,
        vaccinators
      };
      res.status(200).json(patientInfo);
    } catch (error) {
      console.error('Error fetching all patient information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createPatient: async (req: Request, res: Response) => {
    const patientData = req.body;
    const validationResult = validPatient(patientData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const newPatient = await PatientModel.create(patientData);
      console.log("New patient created:", newPatient); // Log the newly created patient
      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllPatients: async (req: Request, res: Response) => {
    try {
      const patients = await PatientModel.find();
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching all patients:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getPatientById: async (req: Request, res: Response) => {
    const { patientId } = req.params;

    try {
      const patient = await PatientModel.findOne({ patientId });
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error fetching patient by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePatient: async (req: Request, res: Response) => {
    const { patientId } = req.params;
    const patientData = req.body;
    delete patientData._id
    delete patientData.__v
console.log(patientData);

    const validationResult = validPatient(patientData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const updatedPatient = await PatientModel.findOneAndUpdate({ patientId }, patientData, { new: true });
      if (!updatedPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deletePatient: async (req: Request, res: Response) => {
    const { patientId } = req.params;

    try {
      const deletedPatient = await PatientModel.findOneAndDelete({patientId});
      if (!deletedPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
