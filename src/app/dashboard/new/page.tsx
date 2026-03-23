import React from 'react'

import { redirect } from 'next/navigation'
import getSessioncheck from '~/lib/action'
import { cookies } from 'next/headers'
import CreateRepo from '~/components/create-repo'
import { backendUrl } from '~/lib/api'

const page = async () => {
     const session = await getSessioncheck()
  if ( !session) {
    redirect('/')
  }
  try {
    const cookieStore = cookies()
    await fetch(`${backendUrl}`, {
       credentials: 'include',
   headers:{
    cookie: (await cookieStore).toString()
   }
    
    
  })
  } catch (error) {
    console.log(error)
  }
  return  <CreateRepo />
      
  
}

export default page