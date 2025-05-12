import IFeedback from '../../interfaces/IFeedback'
import { FeedbackPaginationType, ServiceReturnType } from '../../constants/types'

interface IFeedbackService {

  createFeedback(feedback: Partial<IFeedback>): ServiceReturnType<IFeedback>
  updateFeedback(feedbackId: string, feedback: Partial<IFeedback>): ServiceReturnType<IFeedback | null>

  getFeedbacks(userId: string, page: number): ServiceReturnType<FeedbackPaginationType>

}

export default IFeedbackService