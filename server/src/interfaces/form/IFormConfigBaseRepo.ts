
interface IFormConfigBaseRepo<T, U> {

  create(formData: T): Promise<U>
  update(formData: T): Promise<U | null>
  delete(formData: T): Promise<U | null>
  findById(id: string): Promise<U | null>
  findLatest(): Promise<U | null>
}


export default IFormConfigBaseRepo