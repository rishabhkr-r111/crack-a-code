'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = createClient();

  const d = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Sign up the user
  const { data , error} = await supabase.auth.signUp(d);
  console.log(data);

  if (error) {
    console.log(error)
    throw new Error("ERROR");
  }

  // Insert into the 'account' table
  if (data.user) {
    const { error: insertError } = await supabase
      .from("accounts")
      .insert({
        user_id: data.user.id,
        role: "USER",
        email: d.email,
      });

    if (insertError) {
      console.log(insertError.message)
      throw new Error(insertError.message);
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}