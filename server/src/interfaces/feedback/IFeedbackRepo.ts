import IFeedback from "../IFeedback"


interface IFeedbackRepo {

  createFeedback(feedback: Partial<IFeedback>): Promise<IFeedback>
  updateFeedback(feedbackId: string, feedback: Partial<IFeedback>): Promise<IFeedback | null>

}

export default IFeedbackRepo