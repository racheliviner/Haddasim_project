import express, { Request, Response } from "express";
import { vaccineController } from "../controllers/vaccineController";

const router = express.Router();
router.post("/", vaccineController.createVaccine);
router.get("/", vaccineController.getAllVaccines);
router.get("/:vaccineId", vaccineController.getVaccineById);
router.put("/:vaccineId", vaccineController.updateVaccine);
router.delete("/:vaccineId", vaccineController.deleteVaccine);

// Catch-all route for handling undefined routes
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;
