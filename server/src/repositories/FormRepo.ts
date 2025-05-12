import IFormConfigBaseRepo from '../interfaces/form/IFormConfigBaseRepo'
import IFromRepo from '../interfaces/form/IFormRepo'
import IFormConfig from '../interfaces/IFormConfig'
import { IFormConfigDb } from '../model/fromConfigModel'
import { convertIFormConfigDbToIFormConfig, convertIFormConfigToIFormConfigDb } from '../util/converters'

class FormRepo implements IFromRepo {

  constructor(
    private formConfigBaseRepo: IFormConfigBaseRepo<Partial<IFormConfigDb>, IFormConfigDb>
  ) { }

  async createFormConfig(formData: IFormConfig): Promise<IFormConfig> {
    try {
      const converted = convertIFormConfigToIFormConfigDb(formData)
      const newForm = await this.formConfigBaseRepo.create(converted)
      return convertIFormConfigDbToIFormConfig(newForm)
    } catch (error) {
      throw error
    }
  }

  async findLatestFormConfig(): Promise<IFormConfig | null> {
    try {
      const formData = await this.formConfigBaseRepo.findLatest()
      return formData ? convertIFormConfigDbToIFormConfig(formData) : null
    } catch (error) {
      throw error
    }
  }

}

export default FormRepo