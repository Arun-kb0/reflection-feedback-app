
interface IFeedbackBaseRepo<T, U> {

  create(feedback: T): Promise<U>
  findByIdAndUpdate(feedbackId: string, feedback: T): Promise<U | null>
  findById(feedbackId: string): Promise<U | null>
  delete(feedbackId: string): Promise<U | null>

  countByRequestorUserId(userId: string): Promise<number>
  findAllByRequestorUserId(userId: string, limit:number,startIndex:number): Promise<U[]>

}

export default IFeedbackBaseRepo