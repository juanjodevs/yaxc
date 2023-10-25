'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { IconBrandGithubFilled, IconLogout } from '@tabler/icons-react'

export default function AuthButtonClient ({ session }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <>
      {
        session
          ? <button onClick={handleSignOut}><IconLogout size={24} color={'#f87171'}/></button>
          : <button onClick={handleSignIn} className='flex flex-row justify-center gap-2 border rounded-md border-slate-600 p-2'><IconBrandGithubFilled size={24} />Login with Github</button>
      }
    </>
  )
}
