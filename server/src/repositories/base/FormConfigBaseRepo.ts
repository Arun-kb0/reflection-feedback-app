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
  async findLatest(): Promise<U | null> {
    try {
      const formConfig = await this.fromConfigModel.find({})
        .sort({ updatedAt: -1 }).limit(1)
      return formConfig.length > 0 ? (formConfig[0] as unknown as U) : null
    } catch (error) {
      return handleRepoError(error)
    }
  }

  update(formData: T): Promise<U | null> {
    throw new Error("Method not implemented.");
  }

  delete(formData: T): Promise<U | null> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<U | null> {
    throw new Error("Method not implemented.");
  }

}

export default FormConfigBaseRepo