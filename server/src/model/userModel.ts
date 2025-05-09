import mongoose, { Date, Types } from "mongoose";
import { Profile, Roles } from '../interfaces/IUser'

export interface IUserDb {
  _id: Types.ObjectId
  email: string
  password: string
  roles: Roles[]
  profile: Profile
  createdAt: Date
  updatedAt: Date
}

const ProfileSchema = new mongoose.Schema<Profile>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
})

const UserSchema = new mongoose.Schema<IUserDb>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: {
    type: [{ type: String }],
    enum: ['requestor', 'provider', 'manager', 'admin'],
    default: ['requestor']
  },
  profile: { type: ProfileSchema, required: true },
}, { timestamps: true })

const userModel = mongoose.model('users', UserSchema)

export default userModel
