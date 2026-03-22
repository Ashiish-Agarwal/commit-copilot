import { redirect } from 'next/navigation'
import LoginPage from '~/components/login'
import getSessioncheck from '~/lib/action'

const page =async () => {

  const session = await getSessioncheck()
  if (session) {
    return redirect('/dashboard')
  }
  return <LoginPage />
}

export default page