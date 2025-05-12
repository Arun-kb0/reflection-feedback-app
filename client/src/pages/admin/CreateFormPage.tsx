import { useState } from "react"
import Title from "../../components/basic/Title"
import type { BreadcrumbType } from "../../constants/types"
import ConfigFieldModel from "../../components/admin/ConfigFiledModel"
import { Button } from "@material-tailwind/react"
import type { ConfigFieldType, ConfigFormValuesType, FormConfigType } from "../../constants/formTypes"
import FieldDetailsCard from "../../components/basic/FieldDetailsCard"
import ConfigForm from "../../components/admin/ConfigForm"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../app/store"
import { createForm } from "../../features/form/formApi"

type Props = {}

const CreateFormPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [fields, setFields] = useState<ConfigFieldType[]>([])
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Admin", href: "/admin" },
    { label: "Create Form", href: '/admin/create-form' }
  ])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmittedValues = (data: ConfigFieldType) => {
    console.log(data)
    if (fields.find(item => item.id === data.id)) {
      toast.error('id must be unique')
      return
    }
    setFields(prev => [...prev, data])
  }

  const handleDeleteField = (id: string) => {
    setFields(prev => prev.filter(item => item.id !== id))
  }

  const handleConfigFormSubmit = (data: ConfigFormValuesType) => {
    const configData: Omit<FormConfigType, '_id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      fields,
      isAnonymousAllowed: false,
      recallTimeFrame: data.recallTimeFrame,
      requestLimits: data.requestLimits,
      effectiveFrom: data.effectiveFrom
      ? new Date(new Date(data.effectiveFrom).getTime() + 5 * 60 * 1000).toISOString()
      : new Date(new Date().getTime() + 5 * 60 * 1000).toISOString(),
    }
    dispatch(createForm(configData))
    toast('new form configured')
  }

  return (
    <main className='min-h-screen pb-6'>
      <div className="mt-24">
        <Title
          title="Create Form"
          breadcrumbs={breadcrumbs}
        />
      </div>

      <div className="flex justify-center ">
        <Button
          variant="gradient"
          onClick={handleOpen}
        >
          Add field
        </Button>
      </div>
      <div className="flex justify-center">
        <ConfigFieldModel
          open={open}
          handleOpen={handleOpen}
          handleSubmittedValues={handleSubmittedValues}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-1">
        {fields.map((item, index) => (
          <FieldDetailsCard
            key={index}
            field={item}
            handleDelete={handleDeleteField}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-1">

        {fields.length > 0 &&
          <ConfigForm
            handleConfigFormSubmit={handleConfigFormSubmit}
          />
        }
      </div>

    </main >
  )
}

export default CreateFormPage