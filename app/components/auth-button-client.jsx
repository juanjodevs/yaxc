'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { IconBrandGithubFilled, IconBrandGoogle, IconLogout } from '@tabler/icons-react'

export default function AuthButtonClient ({ session }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className='flex flex-col gap-2'>
      {
        session
          ? <button onClick={handleSignOut}><IconLogout size={24} color={'#f87171'}/></button>
          : (
            <>
              <button onClick={() => handleSignIn('github')} className='flex flex-row justify-center gap-2 border rounded-md border-slate-600 p-2'><IconBrandGithubFilled size={24} />Login with Github</button>
              <button onClick={() => handleSignIn('google')} className='flex flex-row justify-center gap-2 border rounded-md border-slate-600 p-2'><IconBrandGoogle size={24} />Login with Google</button>
            </>
          )
      }
    </div>
  )
}
