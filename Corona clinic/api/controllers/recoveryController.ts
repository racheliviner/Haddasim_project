import { Request, Response } from 'express';
import { RecoveryModel } from '../models/recoveryModel';
import { validRecovery } from '../validations/recoveryValidation';

export const recoveryController = {
  createRecovery: async (req: Request, res: Response) => {
    const recoveryData = req.body;
    const validationResult = validRecovery(recoveryData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const newRecovery = await RecoveryModel.create(recoveryData);
      res.status(201).json(newRecovery);
    } catch (error) {
      console.error('Error creating recovery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  getAllRecoveries: async (req: Request, res: Response) => {
    try {
      const recoveries = await RecoveryModel.find();
      res.status(200).json(recoveries);
    } catch (error) {
      console.error('Error fetching all recoveries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getRecoveryById: async (req: Request, res: Response) => {
    const { patientId } = req.params;

    try {
      const recovery = await RecoveryModel.findById({ patientId } );
      if (!recovery) {
        return res.status(404).json({ error: 'Recovery not found' });
      }
      res.status(200).json(recovery);
    } catch (error) {
      console.error('Error fetching recovery by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateRecovery: async (req: Request, res: Response) => {
    const { patientId } = req.params;
    const recoveryData = req.body;

    const validationResult = validRecovery(recoveryData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const updatedRecovery = await RecoveryModel.findOneAndUpdate( {patientId}, recoveryData, { new: true });
      if (!updatedRecovery) {
        return res.status(404).json({ error: 'Recovery not found' });
      }
      res.status(200).json(updatedRecovery);
    } catch (error) {
      console.error('Error updating recovery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteRecovery: async (req: Request, res: Response) => {
    const { patientId } = req.params;
    try {
      const deletedRecovery = await RecoveryModel.findOneAndDelete({ patientId });
      if (!deletedRecovery) {
        return res.status(404).json({ error: 'Recovery not found' });
      }
      res.status(200).json({ message: 'Recovery deleted successfully' });
    } catch (error) {
      console.error('Error deleting recovery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
