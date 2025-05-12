import { useEffect, useState } from 'react'
import Title from '../../components/basic/Title'
import type { BreadcrumbType } from '../../constants/types'
import FeedbackForm from '../../components/user/FeedbackForm'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import type { FeedbackType, FieldsFeedbackType } from '../../constants/formTypes'
import { getLatestFeedbackForm } from '../../features/form/formApi'
import { selectFormCurrentForm } from '../../features/form/formSlice'
import { useLocation } from 'react-router-dom'
import { selectAuthUser } from '../../features/auth/authSlice'
import { createFeedback } from '../../features/feedback/feedbackApi'
import { toast } from 'react-toastify'


const WriteFeedback = () => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Home", href: "/" },
    { label: "Write", href: '/write' }
  ])
  const currentFormConfig = useSelector(selectFormCurrentForm)
  const currentUser = useSelector(selectAuthUser)
  const currentForm = useSelector(selectFormCurrentForm)
  const user = location.state

  useEffect(() => {
    dispatch(getLatestFeedbackForm())
  }, [])

  const handleSubmitFeedback = (data: Record<string, any>) => {
    if (!currentUser || !currentForm) return
    const { anonymous, ...rest } = data
    const dataFields: FieldsFeedbackType[] = Object.entries(rest).map(([fieldId, value]) => ({
      fieldId,
      value,
    }))
    const feedbackData: Omit<FeedbackType, '_id' | 'createdAt' | 'updatedAt'> = {
      requestorUserId: user._id,
      providerUserId: currentUser._id,
      fromId: currentForm._id,
      fields: dataFields,
      isAnonymous: anonymous,
      status: 'pending',
    }

    dispatch(createFeedback(feedbackData))
    toast('Feedback given.')
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