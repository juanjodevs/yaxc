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
      <p className='flex flex-row justify-center pb-5 text-xl gap-1'>Yet another <IconBrandX size={24}/> clone just for learning purposes</p>
      <div className='flex justify-center'>
        <AuthButtonServer/>
      </div>
    </div>
  )
}
