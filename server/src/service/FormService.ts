import { ServiceReturnType } from '../constants/types'
import IFormRepo from '../interfaces/form/IFormRepo'
import IFormService from '../interfaces/form/IFormService'
import IFormConfig from '../interfaces/IFormConfig'
import {handleServiceData} from '../util/handleService'

class FormService implements IFormService {

  constructor(
    private formRepo: IFormRepo
  ) { }

  async createFormConfig(formData: IFormConfig): ServiceReturnType<IFormConfig> {
    try {
      const formConfigData = await this.formRepo.createFormConfig(formData)
      return handleServiceData(formConfigData)
    } catch (error) {
      throw error
    }
  }

  async findLatestFormConfig(): ServiceReturnType<IFormConfig | null> {
    try {
      const formConfigData = await this.formRepo.findLatestFormConfig()
      return handleServiceData(formConfigData)
    } catch (error) {
      throw error
    }
  }



}

export default FormService