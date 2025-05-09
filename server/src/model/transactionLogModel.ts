import mongoose, { Schema, Types } from "mongoose";
import { IField } from "../interfaces/IFormConfig";
import { FieldsSchema } from "./fromConfigModel";

interface ITransactionLogDb {
  _id: Types.ObjectId
  action: string
  formId: Types.ObjectId
  userId: Types.ObjectId
  description: string
  updatedFields: IField[]
  createdAt: string
  updatedAt: string
}

const TransactionsLogSchema = new Schema<ITransactionLogDb>({
  action: { type: String, required: true },
  formId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  updatedFields: { type: [FieldsSchema], required: true }
}, { timestamps: true })

const transactionModel = mongoose.model('transaction_log', TransactionsLogSchema)

export default transactionModel