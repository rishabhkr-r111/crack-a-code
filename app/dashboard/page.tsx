import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic';
import HandleSignOut from './handleSignOut';

export default async function Dashboard() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')

  }

  function handleSignOut() {
    supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Dashboard</h1>
      <h1 className="text-4xl font-bold mb-4 text-center">Hi, {data.user.email}</h1>
      
      <div>
        <h1 className="text-2xl font-bold m-4 ">My Submitions</h1>
      </div>
      <HandleSignOut />
    </div> 
  );
}