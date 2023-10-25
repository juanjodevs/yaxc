'use client'

import Likes from './likes'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Tweets ({ tweets }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    supabase.channel('tweets_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tweets' },
        (payload) => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.channel('tweets_channel').unsubscribe()
    }
  }, [supabase, router])

  return (
    <>
      {
        tweets?.map((tweet) => (
          <div key={tweet?.id} className='flex flex-row border-b border-gray-400 dark:border-gray-700 p-5 gap-5'>
            <div className='mt-2'>
              <Image
                src={tweet.profiles.avatar_url}
                width={38}
                height={38}
                alt='User profile image'
                className='rounded-full'
              />
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-row gap-2 align-middle justify-center'>
                <span className='font-bold'>{tweet.profiles.name}</span>
                <span className='opacity-60'>@{tweet?.profiles.user_name}</span>
              </div>
              <p>{tweet?.title}</p>
              <Likes tweet={tweet} />
            </div>
          </div>
        ))
      }
    </>
  )
}
