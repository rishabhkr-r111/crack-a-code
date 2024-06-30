"use server"
import { createClient } from '@/utils/supabase/server';

export async function AddQuestion(formData: FormData) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const starterCode = formData.get("init-code") as string;
  const testCases = formData.get("test-cases") as string;
  const contestId = formData.get("contest_id") as string;

  const { data, error } = await supabase
    .from("questions")
    .insert([
      { name, description, init_code: starterCode, test_cases: testCases, contest_id: contestId}
    ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;

}