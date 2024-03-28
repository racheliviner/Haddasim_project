// vaccinatorController.ts
import { Request, Response } from 'express';
import { VaccinatorModel, addVaccine } from '../models/vaccinatorModel';
import { validateVaccinator } from '../validations/vaccinatorValidation';

export const vaccinatorController = {
  createVaccinator: async (req: Request, res: Response) => {
      const vaccinatorData = req.body;

      const validationResult = validateVaccinator(vaccinatorData);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details });
      }

      try {
        const newVaccinator = await addVaccine(vaccinatorData);
        res.status(201).json(newVaccinator);
    } catch (error) {
      console.error('Error creating vaccinator:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllVaccinators: async (_req: Request, res: Response) => {
    try {
      const vaccinators = await VaccinatorModel.find();
      res.status(200).json(vaccinators);
    } catch (error) {
      console.error('Error fetching all vaccinators:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getVaccinatorById: async (req: Request, res: Response) => {
    const { patientId } = req.params;
    try {
      const vaccinators = await VaccinatorModel.find({ patientId: patientId });
      if (!vaccinators || vaccinators.length === 0) {
        return res.status(404).json({ error: 'No vaccinators found for the provided patient ID' });
      }
      res.status(200).json(vaccinators);
    } catch (error) {
      console.error('Error fetching vaccinators by patient ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

  updateVaccinator: async (req: Request, res: Response) => {
    const { patientId } = req.params;
    const vaccinatorData = req.body;

    const validationResult = validateVaccinator(vaccinatorData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const updatedVaccinator = await VaccinatorModel.findByIdAndUpdate(patientId, vaccinatorData, { new: true });
      if (!updatedVaccinator) {
        return res.status(404).json({ error: 'Vaccinator not found' });
      }
      res.status(200).json(updatedVaccinator);
    } catch (error) {
      console.error('Error updating vaccinator:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteVaccinator: async (req: Request, res: Response) => {
    const { patientId } = req.params;
    try {
      const deletedVaccinator = await VaccinatorModel.findByIdAndDelete( patientId);
      if (!deletedVaccinator) {
        return res.status(404).json({ error: 'Vaccinator not found' });
      }
      res.status(200).json({ message: 'Vaccinator deleted successfully' });
    } catch (error) {
      console.error('Error deleting vaccinator:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
