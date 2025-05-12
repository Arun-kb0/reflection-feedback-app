import { Model } from "mongoose";
import IFeedbackBaseRepo from "../../interfaces/feedback/IFeedbackBaseRepo";
import { IFeedbackDb } from '../../model/feedbackModel'
import handleRepoError from '../../util/handleRepoError'
import { convertToObjectId } from "../../util/converters";


class FeedbackBaseRepo<T, U> implements IFeedbackBaseRepo<T, U> {

  constructor(
    private feedbackModel: Model<IFeedbackDb>
  ) { }

  async countByRequestorUserId(userId: string): Promise<number> {
    try {
      const userObjId = convertToObjectId(userId)
      const count = await this.feedbackModel.countDocuments({ requestorUserId: userObjId })
      return count
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findAllByRequestorUserId(userId: string, limit: number, startIndex: number): Promise<U[]> {
    try {
      const userObjId = convertToObjectId(userId)
      const feedbacks = await this.feedbackModel.find({ requestorUserId: userObjId })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
      return feedbacks as unknown as U[]
    } catch (error) {
      return handleRepoError(error)
    }
  }



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