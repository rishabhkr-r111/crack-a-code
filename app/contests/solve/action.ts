"use server"
import { createClient } from '@/utils/supabase/server';

export async function GetQuestionById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
