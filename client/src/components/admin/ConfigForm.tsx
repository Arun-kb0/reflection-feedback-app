import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import type { ConfigFormValuesType } from "../../constants/formTypes";




type Props = {
  handleConfigFormSubmit: (data: ConfigFormValuesType) => void
}

const ConfigForm = ({ handleConfigFormSubmit }:Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigFormValuesType>({
    defaultValues: {
      recallTimeFrame: { days: 0, hours: 0 },
      requestLimits: {
        rollingWindowDays: 0,
        maxRequestPerUser: 0,
      },
      name: "",
      effectiveFrom: "",
    },
    mode: "onChange",
  })

  const onSubmit = (data: ConfigFormValuesType) => {
    handleConfigFormSubmit(data)
  }

  return (
    <Card className="shadow-lg m-6 p-5 flex justify-center">
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" className='text-lg font-semibold text-center my-4'>
          Config Form
        </Typography>
        <div className="mb-4 flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Name"
                isError={!!errors.name}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            )}
          />
          {errors.name && (
            <Typography className="text-xs text-red-400">{errors.name.message}</Typography>
          )}

          <Typography variant="h6">
            Recall Time Frame
          </Typography>
          <Typography className='text-gray-400' >days</Typography>
          <Controller
            name="recallTimeFrame.days"
            control={control}
            rules={{
              min: { value: 0, message: "Days must be positive" }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Days"
                min={0}
                isError={!!errors.recallTimeFrame?.days}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            )}
          />
          {errors.recallTimeFrame?.days && (
            <Typography className="text-xs text-red-400">{errors.recallTimeFrame.days.message}</Typography>
          )}

          <Typography className='text-gray-400' >hours</Typography>
          <Controller
            name="recallTimeFrame.hours"
            control={control}
            rules={{
              min: { value: 0, message: "Hours must be positive" }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Hours"
                min={0}
                isError={!!errors.recallTimeFrame?.hours}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            )}
          />
          {errors.recallTimeFrame?.hours && (
            <Typography className="text-xs text-red-400">{errors.recallTimeFrame.hours.message}</Typography>
          )}

          <Typography variant="h6">
            Request Limits
          </Typography>
          <Typography className='text-gray-400' >rolling window days</Typography>

          <Controller
            name="requestLimits.rollingWindowDays"
            control={control}
            rules={{
              min: { value: 0, message: "Rolling window days must be positive" }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Rolling Window Days"
                min={0}
                isError={!!errors.requestLimits?.rollingWindowDays}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            )}
          />
          {errors.requestLimits?.rollingWindowDays && (
            <Typography className="text-xs text-red-400">{errors.requestLimits.rollingWindowDays.message}</Typography>
          )}

          <Typography className='text-gray-400' >max request per user</Typography>
          <Controller
            name="requestLimits.maxRequestPerUser"
            control={control}
            rules={{
              min: { value: 0, message: "Max requests per user must be positive" }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Max Requests Per User"
                min={0}
                isError={!!errors.requestLimits?.maxRequestPerUser}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            )}
          />
          {errors.requestLimits?.maxRequestPerUser && (
            <Typography className="text-xs text-red-400">{errors.requestLimits.maxRequestPerUser.message}</Typography>
          )}

          {/* effective date */}
          {/* <Controller
            name="effectiveFrom"
            control={control}
            rules={{ required: "Effective From is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                placeholder="Effective From"
                isError={!!errors.effectiveFrom}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            )}
          />
          {errors.effectiveFrom && (
            <Typography className="text-xs text-red-400">{errors.effectiveFrom.message}</Typography>
          )} */}
        </div>
        <Button className="mt-6" isFullWidth type="submit">
          Save Config
        </Button>
      </form>
    </Card>
  );
};

export default ConfigForm