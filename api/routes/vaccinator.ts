import express, { Request, Response } from "express";
import { vaccinatorController } from "../controllers/vaccinatorController";

const router = express.Router();

router.post("/", vaccinatorController.createVaccinator);
router.get("/", vaccinatorController.getAllVaccinators);
router.get("/:patientId", vaccinatorController.getVaccinatorById);
router.put("/:patientId", vaccinatorController.updateVaccinator);
router.delete("/:patientId", vaccinatorController.deleteVaccinator);

// Catch-all route for handling undefined routes
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;