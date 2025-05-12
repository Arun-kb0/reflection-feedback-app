
export type FieldType = 'text' | 'multiline' | 'rating' | 'dropdown' | 'date' | 'number';

export type ConfigFieldType = {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}


export type ConfigFormValuesType = {
  name: string
  effectiveFrom: string,
  recallTimeFrame: RecallTimeFrameType;
  requestLimits: RequestLimitsType;
}


export type RecallTimeFrameType = {
  days: number
  hours: number
}

export type RequestLimitsType = {
  rollingWindowDays: number
  maxRequestPerUser: number
}

export type FormConfigType = {
  _id: string
  name: string
  fields: ConfigFieldType[]
  isAnonymousAllowed: boolean
  recallTimeFrame: RecallTimeFrameType
  requestLimits: RequestLimitsType
  effectiveFrom: string
  createdAt: string
  updatedAt: string
}



export type FeedBackStatusType = 'pending' | 'completed' | 'expired' | 'rejected'

export type FieldsFeedbackType =  {
  fieldId: string,
  value: string
}

export type FeedbackType =  {
  _id: string
  requestorUserId: string
  providerUserId: string
  fromId: string
  fields: FieldsFeedbackType[]
  isAnonymous: boolean
  status: FeedBackStatusType
  rejectedReason?: string
  createdAt: string
  updatedAt: string
}
