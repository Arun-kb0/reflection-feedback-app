import { ServiceReturnType } from "../constants/types";
import IFeedbackRepo from "../interfaces/feedback/IFeedbackRepo";
import IFeedbackService from "../interfaces/feedback/IFeedbackService";
import IFeedback from "../interfaces/IFeedback";
import {handleServiceData} from "../util/handleService";


class FeedbackService implements IFeedbackService {

  constructor(
    private feedbackRepo: IFeedbackRepo
  ) { }

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