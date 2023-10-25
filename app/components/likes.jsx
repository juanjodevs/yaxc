'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { IconHeartFilled } from '@tabler/icons-react'

export default function Likes ({ tweet }) {
  const router = useRouter()

  const handleLikes = async () => {
    const supabase = createClientComponentClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      if (tweet.likes.filter((like) => like.user_id === user.id).length === 0) {
        await supabase.from('likes').insert({ user_id: user.id, tweet_id: tweet.id })
      } else {
        await supabase.from('likes').delete().eq('user_id', user.id).eq('tweet_id', tweet.id)
      }
      router.refresh()
    }
  }
  return (
    <div onClick={handleLikes} className='flex flex-row gap-1'>
      <IconHeartFilled size={18} className='cursor-pointer'/>
      <span className='text-sm'>{tweet.likes.length}</span>
    </div>
  )
}
