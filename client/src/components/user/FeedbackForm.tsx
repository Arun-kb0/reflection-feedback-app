
import { Controller, useForm } from 'react-hook-form'
import type { FieldsFeedbackType, FormConfigType } from '../../constants/formTypes'
import { Button, Input } from '@material-tailwind/react'

type Props = {
  formConfig: FormConfigType
  handleSubmittedValues: (data: any) => void
}

const FeedbackForm = ({ handleSubmittedValues, formConfig }: Props) => {
  const { control, handleSubmit, reset } = useForm<any>({})

  const onSubmit = (data: any) => {
    handleSubmittedValues(data)
    reset()
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
      {formConfig.fields.map((field) => (
        <Controller
          key={field.id}
          name={field.label}
          control={control}
          rules={{ required: field.required }}
          render={({ field: controllerField }) => (
            <input
              {...controllerField}
              type={field.type as string}
              placeholder={field.label as string}
              required={field.required as boolean}
            />
          )}
        />
      ))}

      <div className='flex gap-1'>
        <span className='text-gray-400'> Anonymous : </span>
        <Controller
          key='anonymous'
          name='anonymous'
          control={control}
          rules={{ required: true }}
          render={({ field: controllerField }) => (
            <input
              {...controllerField}
              type={'checkbox'}
              required={true}
            />
          )}
        />
      </div>

      <Button type="submit" variant="gradient" >
        send feedback
      </Button>
    </form>
  )
}

export default FeedbackForm