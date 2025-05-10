
export type Roles = 'requestor' | 'provider' | 'manager' | 'admin'

export interface Profile {
  firstName: string
  lastName: string
  department: string
  designation: string
}

interface IUser {
  _id: string
  email: string
  password: string
  accessToken: string
  roles: Roles[]
  profile: Profile
  createdAt: string
  updatedAt: string
}

export default IUser