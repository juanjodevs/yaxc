import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Header from './components/header'
import { redirect } from 'next/navigation'
import NewTweet from './components/new-tweet'
import Tweets from './components/tweets'

export const dynamic = 'force-dynamic'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/login')
  }
  const { data: tweets } = await supabase.from('tweets').select('*, profiles(*), likes(*)')

  return (
    <main className='max-w-[600px] m-auto border-l border-r border-gray-400 bg-white dark:bg-neutral-700 dark:border-white min-h-screen'>
      <Header />
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </main>
  )
}
