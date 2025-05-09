import { IField } from "./IFormConfig";

interface ITransactionLog {
  _id: string
  action: string; // e.g., 'form_update', 'field_added', etc.
  formId: string
  userId: string // who performed the action
  description: string;
  updatedFields: IField[]
  createdAt: string
  updatedAt: string
}

export default ITransactionLog