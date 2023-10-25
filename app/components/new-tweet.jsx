'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function NewTweet ({ user }) {
  const [tweet, setTweet] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()

  const addTweet = (e) => {
    e.preventDefault()
    if (tweet.trim() !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweet })
      }

      fetch('/api/tweets/new', requestOptions)
        .then(response => response.json())
        .then(({ error }) => {
          if (error) { setErrorMessage(error.message) } else {
            setTweet('')
            router.refresh()
          }
        })
        .catch((err) => {
          console.log(err.message)
          setErrorMessage('Ha ocurrido un error 😥')
        })
    }
  }

  return (
    <div className='flex flex-row p-5 border-b border-gray-400 dark:border-gray-700 gap-5'>
      <div>
        <Image
          src={user.user_metadata.avatar_url}
          width={38}
          height={38}
          alt='User profile image'
          className='rounded-full'
        />
      </div>
      <form className='w-full flex flex-col' onSubmit={(e) => addTweet(e)}>
        <textarea className='w-full h-24 bg-transparent outline-none text-xl resize-none' name='title' value={tweet} onChange={(e) => setTweet(e.target.value)} placeholder={'What\'s happening?'}></textarea>
        {
          errorMessage && (<p className='text-sm text-red-500'>{errorMessage}</p>)
        }
        <div className='flex justify-end'>
          <button className='bg-sky-500 text-white rounded-3xl px-5 py-2 mt-5 disabled:opacity-50' disabled={tweet.trim() === ''}>Post</button>
        </div>
      </form>
    </div>
  )
}
