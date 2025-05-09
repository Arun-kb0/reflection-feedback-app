
export type FieldType = 'text' | 'multiline' | 'rating' | 'dropdown' | 'date' | 'number'

export interface IField {
  id: string
  label: string
  type: FieldType
  required: boolean
}

export interface IRecallTimeFrame {
  days: number
  hours: number
}

export interface IRequestLimits {
  rollingWindowDays: number
  maxRequestPerUser: number
}

interface IFormConfig {
  _id: string
  name: string
  fields: IField[]
  isAnonymousAllowed: boolean
  recallTimeFrame: IRecallTimeFrame
  requestLimits: IRequestLimits
  effectiveFrom: string
  createdAt: string
  updatedAt: string
}

export default IFormConfig