import express, { Request, Response } from "express";
import { patientController } from "../controllers/patientController";

const router = express.Router();

router.post("/", patientController.createPatient);
router.get("/", patientController.getAllPatients);
router.get("/:patientId", patientController.getPatientById);
router.get("/all/:patientId", patientController.getAllPatientInfo); 
router.put("/:patientId", patientController.updatePatient);
router.delete("/:patientId", patientController.deletePatient);

// Catch-all route for handling undefined routes
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;
