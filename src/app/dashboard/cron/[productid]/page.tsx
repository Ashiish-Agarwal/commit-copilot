import React from 'react'
import Timemaker from '~/components/Timemaker'

const page = async ({params}: {params: Promise<{productid: string}>}) => {
  const productId = (await params).productid
  

  console.log(productId)
  return (
    <div>Time


        <Timemaker productId={productId} />
    </div>
  )
}

export default page