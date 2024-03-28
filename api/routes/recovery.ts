import express, { Request, Response } from "express";
import { recoveryController } from "../controllers/recoveryController";

const router = express.Router();

router.post("/", recoveryController.createRecovery);
router.get("/", recoveryController.getAllRecoveries);
router.get("/:patientId", recoveryController.getRecoveryById);
router.put("/:patientId", recoveryController.updateRecovery);
router.delete("/:patientId", recoveryController.deleteRecovery);

// Catch-all route for handling undefined routes
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;