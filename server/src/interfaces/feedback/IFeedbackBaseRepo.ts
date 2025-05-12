
interface IFeedbackBaseRepo<T, U> {

  create(feedback: T): Promise<U>
  findByIdAndUpdate(feedbackId: string, feedback: T): Promise<U | null>
  findById(feedbackId: string): Promise<U | null>
  delete(feedbackId: string): Promise<U | null>

}

export default IFeedbackBaseRepo