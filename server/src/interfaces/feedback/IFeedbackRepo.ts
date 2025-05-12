import IFeedback from "../IFeedback"


interface IFeedbackRepo {

  createFeedback(feedback: Partial<IFeedback>): Promise<IFeedback>
  updateFeedback(feedbackId: string, feedback: Partial<IFeedback>): Promise<IFeedback | null>

  countByRequestorUserId(userId: string): Promise<number>
  findAllFeedbacksByRequestorUserId(userId: string, limit: number, startIndex: number): Promise<IFeedback[]>

}

export default IFeedbackRepo