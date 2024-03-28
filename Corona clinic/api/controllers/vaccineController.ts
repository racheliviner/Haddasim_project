// vaccineController.ts
import { Request, Response } from 'express';
import { VaccineModel } from '../models/vaccineModel';
import { validateVaccine } from '../validations/vaccineValidation';

export const vaccineController = {
  createVaccine: async (req: Request, res: Response) => {
      const vaccineData = req.body;

      const validationResult = validateVaccine(vaccineData);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details });
      }

      try {
        const newVaccine = await VaccineModel.create(vaccineData);
        res.status(201).json(newVaccine);
    } catch (error) {
      console.error('Error creating vaccine:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllVaccines: async (_req: Request, res: Response) => {
    try {
      const vaccines = await VaccineModel.find();
      res.status(200).json(vaccines);
    } catch (error) {
      console.error('Error fetching all vaccines:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getVaccineById: async (req: Request, res: Response) => {
    const { vaccineId } = req.params;
    try {
      const vaccine = await VaccineModel.findOne({vaccineId});
      if (!vaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
      }
      res.status(200).json(vaccine);
    } catch (error) {
      console.error('Error fetching vaccine by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  updateVaccine: async (req: Request, res: Response) => {
    const { vaccineId } = req.params;
    const vaccineData = req.body;

    const validationResult = validateVaccine(vaccineData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const updatedVaccine = await VaccineModel.findOneAndUpdate({vaccineId}, vaccineData, { new: true });
      if (!updatedVaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
      }
      res.status(200).json(updatedVaccine);
    } catch (error) {
      console.error('Error updating vaccine:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteVaccine: async (req: Request, res: Response) => {
    const { vaccineId } = req.params;

    try {
      const deletedVaccine = await VaccineModel.findOneAndDelete({vaccineId});
      if (!deletedVaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
      }
      res.status(200).json({ message: 'Vaccine deleted successfully' });
    } catch (error) {
      console.error('Error deleting vaccine:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
