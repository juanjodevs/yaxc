import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from '../components/auth-button-server'
import { redirect } from 'next/navigation'

export default async function Login () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/')
  }
  return (<AuthButtonServer/>)
}
