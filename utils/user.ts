import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'

export async function getUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return null;
  }

  return data;
}