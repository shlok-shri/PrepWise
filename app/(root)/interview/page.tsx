import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();

  return (
    <div>
        <h3 className='text-center mb-2'>Interview Generation</h3>

        <Agent userName={user?.name} userId={user?.id} type='generate'/>
    </div>
  )
}

export default page
