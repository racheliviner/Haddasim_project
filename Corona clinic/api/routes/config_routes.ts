import { Application , Request, Response} from "express";
import patientRouter from "./patient";
import recoveryRouter from "./recovery";
import vaccineRouter from "./vaccine";
import vaccinatorRouter from "./vaccinator";

export const routesInit = (app: Application): void => {
  app.use("/patient", patientRouter);
  app.use("/recovery", recoveryRouter);
  app.use("/vaccine", vaccineRouter);
  app.use("/vaccinator", vaccinatorRouter);
  // Route to handle 404 errors for all other routes
  app.use("*", (req: Request, res: Response) => {
    res.status(404).send({error: "my not found"});
  });
};