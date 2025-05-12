import React, { useEffect, useState } from 'react'
import Title from '../../components/basic/Title'
import type { BreadcrumbType } from '../../constants/types'
import FeedbackForm from '../../components/user/FeedbackForm'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import type { FeedbackType, FieldsFeedbackType } from '../../constants/formTypes'
import { getLatestFeedbackForm } from '../../features/form/formApi'
import { selectFormCurrentForm } from '../../features/form/formSlice'
import { GiConsoleController } from 'react-icons/gi'

type Props = {}

const WriteFeedback = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Home", href: "/" },
    { label: "Write", href: '/write' }
  ])
  const currentFormConfig = useSelector(selectFormCurrentForm)

  useEffect(() => {
    dispatch(getLatestFeedbackForm())
  }, [])
  const handleSubmitFeedback = (data: Record<string, any>) => {
    const { anonymous, ...rest } = data
    const dataFields: FieldsFeedbackType[] = Object.entries(rest).map(([fieldId, value]) => ({
      fieldId,
      value,
    }))
    // ! this should be complete
    const feedbackData: FeedbackType = {
      _id: '',
      requestorUserId: '',
      providerUserId: '',
      fromId: '',
      fields: dataFields,
      isAnonymous: anonymous,
      status: 'pending',
      createdAt: '',
      updatedAt: ''
    }
    console.log(feedbackData)
  }

  return (
    <main className='min-h-screen'>
      <div className='mt-20'>
        <Title
          title='Write Feedback'
          breadcrumbs={breadcrumbs}
        />
      </div>
      <div className='flex justify-center'>
        {currentFormConfig &&
          <FeedbackForm
            formConfig={currentFormConfig}
            handleSubmittedValues={handleSubmitFeedback}
          />
        }
      </div>

    </main>
  )
}

export default WriteFeedback