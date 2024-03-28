import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVaccine extends Document {
  vaccineId: Schema.Types.ObjectId; // Unique identifier for the vaccine
  vaccineName: string; // Name of the vaccine
}

const vaccineSchema: Schema = new Schema({
  vaccineId: { type: String, required: true, unique: true },
  vaccineName: { type: String, required: true, unique: true }
});

const VaccineModel: Model<IVaccine> = mongoose.model<IVaccine>("Vaccine", vaccineSchema);

export { VaccineModel };
