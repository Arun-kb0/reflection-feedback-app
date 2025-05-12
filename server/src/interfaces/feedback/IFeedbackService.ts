import IFeedback from '../../interfaces/IFeedback'
import { ServiceReturnType } from '../../constants/types'

interface IFeedbackService {

  createFeedback(feedback: Partial<IFeedback>): ServiceReturnType<IFeedback>
  updateFeedback(feedbackId: string, feedback: Partial<IFeedback>): ServiceReturnType<IFeedback | null>

}

export default IFeedbackService