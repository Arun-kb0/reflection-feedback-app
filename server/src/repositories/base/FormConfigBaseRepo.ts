import IFormConfigBaseRepo from "../../interfaces/form/IFormConfigBaseRepo";
import handleRepoError from '../../util/handleRepoError'
import { IFormConfigDb } from '../../model/fromConfigModel'
import { Model } from "mongoose";

class FormConfigBaseRepo<T, U> implements IFormConfigBaseRepo<T, U> {

  constructor(
    private fromConfigModel: Model<IFormConfigDb>
  ) { }

  async create(formData: T): Promise<U> {
    try {
      const newFormData = await this.fromConfigModel.create(formData)
      return newFormData as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }
  async findLatest(): Promise<any> {
    try {
      const newFormData = await this.fromConfigModel.find()
        .sort({ updatedAt: -1 }).limit(1)
      return newFormData as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }


  update(formData: T): Promise<any> {
    throw new Error("Method not implemented.");
  }

  delete(formData: T): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}

export default FormConfigBaseRepo