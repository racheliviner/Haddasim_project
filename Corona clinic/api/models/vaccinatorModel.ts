import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVaccinator extends Document {
    patientId: Schema.Types.ObjectId; // Reference to the patient
    vaccineId: Schema.Types.ObjectId; // Reference to the vaccine
    vaccineDate: Date; // Date of vaccination
  }
  
  const vaccinatorSchema: Schema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patients', required: true }, // Foreign key reference to Patient
    vaccineId: { type: Schema.Types.ObjectId, ref: 'Vaccine', required: true },
    vaccineDate: { type: Date, required: true }
  });
  
  const VaccinatorModel: Model<IVaccinator> = mongoose.model<IVaccinator>("Vaccinator", vaccinatorSchema);
  
  async function canAddVaccine(patientId: Schema.Types.ObjectId): Promise<boolean> {
    const vaccinationCount = await VaccinatorModel.countDocuments({ patientId });
    return vaccinationCount < 4;
  }
  
  async function addVaccine(vaccineData: IVaccinator): Promise<IVaccinator | null> {
    const { patientId } = vaccineData;
    const canAdd = await canAddVaccine(patientId);
    if (!canAdd) {
      throw new Error("Patient has already received the maximum number of vaccinations.");
    }
    return VaccinatorModel.create(vaccineData);
  }
  
  export { VaccinatorModel, addVaccine };