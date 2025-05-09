import mongoose, { Date, Schema, Types } from "mongoose"

export interface IFeedbackStatsDb {
  userId: Types.ObjectId
  feedbackGiven: number
  feedbackReceived: number
  anonymsFeedbackGiven: number
  anonymsFeedbackReceived: number
  pendingFeedbackRequests: number
  createdAt: Date
  updatedAt: Date
}

const FeedbackStatsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  feedbackGiven: { type: Number, default: 0 },
  feedbackReceived: { type: Number, default: 0 },
  anonymsFeedbackGiven: { type: Number, default: 0 },
  anonymsFeedbackReceived: { type: Number, default: 0 },
  pendingFeedbackRequests: { type: Number, default: 0 },
}, { timestamps: true })

const feedbackStatsModel = mongoose.model('feedback_stats', FeedbackStatsSchema)

export default feedbackStatsModel

