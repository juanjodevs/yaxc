import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from '../components/auth-button-server'
import { redirect } from 'next/navigation'
import { IconBrandX } from '@tabler/icons-react'

export const dynamic = 'force-dynamic'

export default async function Login () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/')
  }
  return (
    <div className='flex flex-col justify-center h-screen'>
      <p className='flex flex-col text-center justify-center pb-5 text-xl gap-1 sm:flex-row'>Yet another <IconBrandX size={24} className='self-center'/> clone just for learning purposes</p>
      <div className='flex justify-center'>
        <AuthButtonServer/>
      </div>
      <div className='flex justify-center mt-5 text-xs'>
        <p>(These buttons may not work if the Supabase project has been automatically paused)</p>
      </div>
    </div>
  )
}
