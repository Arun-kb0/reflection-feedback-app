import mongoose, { Date, Schema, Types } from "mongoose"
import { FeedBackStatus } from "../interfaces/IFeedback"


export interface IFieldsFeedback {
  fieldId: string;
  value: string;
}

export interface IFeedbackDb {
  _id: Types.ObjectId
  requestorUserId: Types.ObjectId
  providerUserId: Types.ObjectId
  fromId: Types.ObjectId
  fields: IFieldsFeedback[]
  isAnonymous: boolean
  status: FeedBackStatus
  rejectedReason?: string
  createdAt: Date
  updatedAt: Date
}


const FieldsSchema = new Schema<IFieldsFeedback>({
  fieldId: { type: String, required: true },
  value: { type: String, required: true },
})

const FeedbackSchema = new Schema<IFeedbackDb>({
  requestorUserId: { type: Schema.Types.ObjectId, required: true },
  providerUserId: { type: Schema.Types.ObjectId, required: true },
  fromId: { type: Schema.Types.ObjectId, required: true },
  fields: { type: [FieldsSchema], required: true },
  isAnonymous: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'completed', 'expired', 'rejected'],
    required: true
  },
  rejectedReason: { type: String }
}, { timestamps: true })

const feedbackModel = mongoose.model('feedbacks', FeedbackSchema)

export default feedbackModel