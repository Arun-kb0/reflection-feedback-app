
interface IFeedbackStats {
  userId: string
  feedbackGiven: number
  feedbackReceived: number
  anonymsFeedbackGiven: number
  anonymsFeedbackReceived: number
  pendingFeedbackRequests: number
  createdAt: string
  updatedAt: string
}

export default IFeedbackStats