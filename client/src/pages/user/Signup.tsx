import SignupForm from '../../components/basic/SignupForm'
import type { SignupFormValues } from '../../constants/userTypes'

type Props = {}

const Signup = (props: Props) => {

  const handleSubmit = (data: SignupFormValues) => {
    console.log('signup')
    const { confirmPassword, ...rest } = data
    console.log(rest)
  }

  return (
    <main className='flex justify-center items-center min-h-screen '>
      <SignupForm
        title='Sign up'
        onSubmit={handleSubmit}
      />

    </main>
  )
}

export default Signup