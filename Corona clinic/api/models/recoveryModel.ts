import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRecovery extends Document {
  patientId: Schema.Types.ObjectId; // Foreign key linking to the Patient table
  positiveDate: Date;
  recoveryDate: Date;
}

const recoverySchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patients', required: true , unique: true },
  positiveDate: { type: Date, required: true },
  recoveryDate: { type: Date, required: true }
});

const RecoveryModel: Model<IRecovery> = mongoose.model<IRecovery>("Recovery", recoverySchema);

export { RecoveryModel };
