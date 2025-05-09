
export type FeedBackStatus = 'pending' | 'completed' | 'expired' | 'rejected'

export interface IFieldsFeedback {
  fieldId: string,
  value: string
}

interface IFeedback {
  _id: string
  requestorUserId: string
  providerUserId: string
  fromId: string
  fields: IFieldsFeedback[]
  isAnonymous: boolean
  status: FeedBackStatus
  rejectedReason?: string 
  createdAt: string
  updatedAt: string
}

export default IFeedback