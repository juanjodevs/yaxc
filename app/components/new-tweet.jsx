'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewTweet () {
  const [tweet, setTweet] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()

  const addTweet = (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweet })
    }

    fetch('/api/tweets/new', requestOptions)
      .then(response => response.json())
      .then(({ error }) => {
        if (error) { setErrorMessage(error.message) } else {
          router.refresh()
        }
      })
  }

  return (
    <form onSubmit={(e) => addTweet(e)}>
      <input name='title' value={tweet} onChange={(e) => setTweet(e.target.value)}/>
      {
        errorMessage && (<p>{errorMessage}</p>)
      }
    </form>
  )
}
