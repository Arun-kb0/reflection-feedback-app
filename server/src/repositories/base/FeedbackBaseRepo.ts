import { Model } from "mongoose";
import IFeedbackBaseRepo from "../../interfaces/feedback/IFeedbackBaseRepo";
import {IFeedbackDb} from '../../model/feedbackModel'
import handleRepoError from '../../util/handleRepoError'


class FeedbackBaseRepo<T, U> implements IFeedbackBaseRepo<T, U> {

  constructor(
    private feedbackModel: Model<IFeedbackDb>
  ){}

  async create(feedback: T): Promise<U> {
    try {
      const newFeedback = await this.feedbackModel.create(feedback)
      return newFeedback as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

  findByIdAndUpdate(feedbackId: string, feedback: T): Promise<U | null> {
    throw new Error("Method not implemented.");
  }

  findById(feedbackId: string): Promise<U | null> {
    throw new Error("Method not implemented.");
  }

  delete(feedbackId: string): Promise<U | null> {
    throw new Error("Method not implemented.");
  }

}

export default FeedbackBaseRepo