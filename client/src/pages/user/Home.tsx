import { useEffect, useState } from 'react'
import Title from '../../components/basic/Title'
import type { BreadcrumbType } from '../../constants/types'
import FeedbackCard from '../../components/user/FeedbackCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectFeedbacks, selectGetFeedbacksStatus } from '../../features/feedback/feedbackSlice'
import { getFeedbacks } from '../../features/feedback/feedbackApi'
import type { AppDispatch } from '../../app/store'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Home", href: "/" },
  ])
  const feedbacks = useSelector(selectFeedbacks)
  const status = useSelector(selectGetFeedbacksStatus)

  useEffect(() => {
    dispatch(getFeedbacks(1))
  },[])

  return (
    <main className='min-h-screen '>

      <div className='mt-20' >
        <Title
          title='Feedbacks'
          breadcrumbs={breadcrumbs}
        />
      </div>

      <div className='flex justify-center gap-1 flex-wrap'>
        {status === 'success' && feedbacks.map(item => (
          <FeedbackCard feedback={item} />
        ))}
      </div>

    </main>
  )
}

export default Home