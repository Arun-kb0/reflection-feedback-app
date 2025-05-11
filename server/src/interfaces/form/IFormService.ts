import { ServiceReturnType } from '../../constants/types'
import IFormConfig from '../IFormConfig'

interface IFormService {

  createFormConfig(formData: IFormConfig): ServiceReturnType<IFormConfig>
  findLatestFormConfig(): ServiceReturnType<IFormConfig | null>

}


export default IFormService