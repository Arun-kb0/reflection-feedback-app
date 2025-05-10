
interface IUserBaseRepo<T, U> {

  create(user: T): Promise<U>
  update(userId: string, user: T): Promise<U | null>
  findById(userId: string): Promise<U | null>
  findByEmail(email: string): Promise<U | null>
  findByAccessToken(accessToken: string): Promise<U | null>

}

export default IUserBaseRepo