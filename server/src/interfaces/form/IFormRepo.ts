import IFormConfig from '../IFormConfig'

interface IFormRepo{

  createFormConfig(formData: IFormConfig): Promise<IFormConfig>
  findLatestFormConfig(): Promise<IFormConfig | null>

}


export default IFormRepo