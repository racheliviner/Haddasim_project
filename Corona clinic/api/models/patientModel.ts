import mongoose, { Schema, Document, Model } from "mongoose";

interface IAddress {
  city: string;
  street: string;
  number: number;
}

export interface IPatient extends Document {
  patientId: string;
  firstName: string;
  lastName: string;
  address: IAddress;
  dateOfBirth: Date;
  phoneNumber: string;
  mobileNumber: string;
  imageUrl?: string; // not required
}

const patientSchema: Schema = new Schema({
  patientId: { type: String, required: true, unique: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: Number, required: true },
  },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  imageUrl: String,
});

const PatientModel: Model<IPatient> = mongoose.model<IPatient>("Patients", patientSchema);

export { PatientModel };
