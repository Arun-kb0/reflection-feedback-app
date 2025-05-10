import IUserBaseRepo from "../../interfaces/auth/IUserBaseRepo";


class UserBaseRepo<T, U> implements IUserBaseRepo<T, U> {

  create(user: T): Promise<U> {
    throw new Error("Method not implemented.");
  }
  
  update(user: T): Promise<U | null> {
    throw new Error("Method not implemented.");
  }
  
  findById(userId: string): Promise<U | null> {
    throw new Error("Method not implemented.");
  }
  
  findByEmail(email: string): Promise<U | null> {
    throw new Error("Method not implemented.");
  }
  
  findByAccessToken(accessToken: string): Promise<U | null> {
    throw new Error("Method not implemented.");
  }


}

export default UserBaseRepo