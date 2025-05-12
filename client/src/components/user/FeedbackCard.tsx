import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import type { FeedbackType } from "../../constants/formTypes";

type Props = {
  feedback: FeedbackType
}

const FeedbackCard = ({ feedback }: Props) => {

  return (
    <Card className="w-96">
      <CardHeader floated={false} className="h-32 flex justify-center">
        <Typography variant="h4" className="mb-2">
          providerId : {feedback.providerUserId}
        </Typography>
      </CardHeader>
      <CardBody className="text-center">
        {feedback.fields.map(item => (
          <Typography variant="h4" className="mb-2">
            {item.fieldId} : {item.value}
          </Typography>
        ))}
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        
      </CardFooter>
    </Card>
  );
}

export default FeedbackCard