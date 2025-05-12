import IFeedbackBaseRepo from "../interfaces/feedback/IFeedbackBaseRepo";
import IFeedbackRepo from "../interfaces/feedback/IFeedbackRepo";
import IFeedback from "../interfaces/IFeedback";
import { IFeedbackDb } from "../model/feedbackModel";
import { convertIFeedbackDbToIFeedback, convertIFeedbackToIFeedbackDb } from '../util/converters'


class FeedbackRepo implements IFeedbackRepo {

  constructor(
    private feedbackBaseRepo: IFeedbackBaseRepo<Partial<IFeedbackDb>, IFeedbackDb>
  ) { }

  async countByRequestorUserId(userId: string): Promise<number> {
    try {
      const count = await this.feedbackBaseRepo.countByRequestorUserId(userId)
      return count
    } catch (error) {
      throw error
    }
  }

  async findAllFeedbacksByRequestorUserId(userId: string, limit: number, startIndex: number): Promise<IFeedback[]> {
    try {
      const feedbacks = await this.feedbackBaseRepo.findAllByRequestorUserId(userId, limit, startIndex)
      return feedbacks.map(item=> convertIFeedbackDbToIFeedback(item))
    } catch (error) {
      throw error
    }
  }

  async createFeedback(feedback: Partial<IFeedback>): Promise<IFeedback> {
    try {
      const converted = convertIFeedbackToIFeedbackDb(feedback)
      const newFeedback = await this.feedbackBaseRepo.create(converted)
      return convertIFeedbackDbToIFeedback(newFeedback)
    } catch (error) {
      throw error
    }
  }

  updateFeedback(feedbackId: string, feedback: Partial<IFeedback>): Promise<IFeedback | null> {
    throw new Error("Method not implemented.");
  }

}

export default FeedbackRepo