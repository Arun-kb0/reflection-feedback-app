import { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import CustomSelectMenu from "../basic/CustomSelectMenu";
import type { ConfigFieldType } from "../../constants/formTypes";

type Props = {
  handleOpen: () => void
  open: boolean
  handleSubmittedValues: (data: ConfigFieldType) => void
}

const ConfigFieldModel = ({ handleOpen, open, handleSubmittedValues }: Props) => {
  const [selectOptions] = useState(["Text", "Multiline", "Rating", "Dropdown", "Date", "Number"])

  const { control, handleSubmit, reset } = useForm<ConfigFieldType>({
    defaultValues: {
      id: "",
      label: "",
      type: "text",
      required: false,
    },
  })

  const onSubmit = (data: ConfigFieldType) => {
    handleSubmittedValues(data)
    handleOpen()
    reset()
  }


  return (
    <section className="w-[80%] max-w-[700px] ">

      <Dialog size="screen" open={open} >
        <Dialog.Content className="relative m-0 mt-4 block border-1 shadow-lg rounded-xl bg-gray-50 p-8">
          <div>
            <Typography variant="h4" className='text-gray-700 font-bold text-lg text-center'>
              Configure Field
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600 text-center">
              configure settings for single field
            </Typography>
            <IconButton
              size="sm"
              variant="outline"
              className="!absolute right-3.5 top-3.5"
              onClick={handleOpen}
            >
              <XMarkIcon className="h-4 w-4 stroke-2" />
            </IconButton>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
            <Controller
              name="id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="ID" {...field} required />
              )}
            />
            <Controller
              name="label"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="Label" {...field} required />
              )}
            />

            <div className="flex gap-2 items-center">
              <Typography className='text-gray-500'>Type : </Typography>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <CustomSelectMenu
                    selectOptions={selectOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <Controller
              name="required"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                  <label htmlFor="required" className="text-gray-700">Required</label>
                </div>
              )}
            />
            <Button type="submit" variant="gradient" >
              Save
            </Button>
          </form>

        </Dialog.Content>
      </Dialog>
    </section>
  );
}

export default ConfigFieldModel