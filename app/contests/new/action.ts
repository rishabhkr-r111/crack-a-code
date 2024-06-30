"use server"
import { createClient } from '@/utils/supabase/server';
import { generateSlug } from '@/utils/slug';

export async function createContest(data: {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
}) {
  const { name, description, startTime, endTime } = data;
  const supabase = createClient();

  const slug = generateSlug(name);

  try {
    const { error } = await supabase.from('contests').insert([
      { name, description, start_at: startTime, end_at: endTime, slug }
    ]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
