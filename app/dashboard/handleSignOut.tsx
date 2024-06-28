"use client";
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function HandleSignOut() {
  const supabase = createClient();
  const router = useRouter();

  function signOut() {
    supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <>
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}