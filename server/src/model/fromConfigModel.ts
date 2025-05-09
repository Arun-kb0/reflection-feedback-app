import mongoose, { Types, Date, Schema } from 'mongoose'
import { IField, IRecallTimeFrame, IRequestLimits } from '../interfaces/IFormConfig'


export interface IFormConfigDb {
  _id: Types.ObjectId
  name: string
  fields: IField[]
  isAnonymousAllowed: boolean
  recallTimeFrame: IRecallTimeFrame
  requestLimits: IRequestLimits
  effectiveFrom: Date
  createdAt: Date
  updatedAt: Date
}

const FieldsSchema = new Schema<IField>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ['text', 'multiline', 'rating', 'dropdown', 'date', 'number'],
    required: true
  },
  required: { type: Boolean, required: true }
})

const RecallTimeFrameSchema = new Schema<IRecallTimeFrame>({
  days: { type: Number, default: 7 },
  hours: { type: Number, required: true }
})

const RequestLimitsSchema = new Schema<IRequestLimits>({
  rollingWindowDays: { type: Number, required: true },
  maxRequestPerUser: { type: Number, required: true }
})

const FormConfigSchema = new Schema<IFormConfigDb>({
  name: { type: String, required: true },
  fields: { type: [FieldsSchema], required: true },
  isAnonymousAllowed: { type: Boolean, default: true },
  recallTimeFrame: { type: RecallTimeFrameSchema, required: true },
  requestLimits: { type: RequestLimitsSchema, required: true },
  effectiveFrom: {
    type: Schema.Types.Date,
    required: true,
    validate: {
      validator: function (value: unknown) {
        return value instanceof Date && value > new Date()
      },
      message: 'Effective date must be in the future'
    }
  }
}, { timestamps: true })

const formConfigModel = mongoose.model('form_configs', FormConfigSchema)

export default formConfigModel