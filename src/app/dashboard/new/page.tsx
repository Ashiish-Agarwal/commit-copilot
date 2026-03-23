import { redirect } from 'next/navigation'
import getSessioncheck from '~/lib/action'
import CreateRepo from '~/components/create-repo'


const page = async () => {
     const session = await getSessioncheck()
  if ( !session) {
    redirect('/')
  }
 
    
    
 
   
  
  return  <CreateRepo />
      
  
}

export default page