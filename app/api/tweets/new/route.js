import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST (req) {
  const body = await req.json()
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  let response = { error: { message: 'User not found' } }
  if (user) {
    response = await supabase.from('tweets').insert({ title: body.tweet, user_id: user.id })
  }
  return Response.json(response)
}
