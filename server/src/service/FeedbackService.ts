import { FeedbackPaginationType, ServiceReturnType } from "../constants/types";
import IFeedbackRepo from "../interfaces/feedback/IFeedbackRepo";
import IFeedbackService from "../interfaces/feedback/IFeedbackService";
import IFeedback from "../interfaces/IFeedback";
import { handleServiceData } from "../util/handleService";


class FeedbackService implements IFeedbackService {

  constructor(
    private feedbackRepo: IFeedbackRepo,
    private limit: number
  ) { }

  async getFeedbacks(userId: string, page: number): ServiceReturnType<FeedbackPaginationType> {
    try {
      const startIndex = (page - 1) * this.limit
      const total = await this.feedbackRepo.countByRequestorUserId(userId)
      const numberOfPages = Math.ceil(total / this.limit)
      const feedbacks = await this.feedbackRepo.findAllFeedbacksByRequestorUserId(userId, this.limit, startIndex)
      const data = {
        feedbacks,
        currentPage: page,
        numberOfPages
      }
      return  handleServiceData(data)
    } catch (error) {
      throw error
    }
  }

  async createFeedback(feedback: Partial<IFeedback>): ServiceReturnType<IFeedback> {
    try {
      const newFeedback = await this.feedbackRepo.createFeedback(feedback)
      return handleServiceData(newFeedback)
    } catch (error) {
      throw error
    }
  }

  updateFeedback(feedbackId: string, feedback: Partial<IFeedback>): ServiceReturnType<IFeedback | null> {
    throw new Error("Method not implemented.");
  }

}

export default FeedbackService