"use server"
import { createClient } from '@/utils/supabase/server';

export async function handleSubmit(questionId: string, contestId: string, code: string) {
  const supabase = createClient();
  try {
    const { message, pass_code, score, correct } = await calcScore(questionId, code);

    const { error: insertError } = await supabase
      .from('submissions')
      .insert([
        { question_id: questionId, contest_id: contestId, code: code, score: score, correct: correct }
      ]);

    if (insertError) {
      throw insertError;
    }

    return { data: { message, pass_code } };
  } catch (error: any) {
    console.error('Error processing submission:', error.message);
    return { error: error.message };
  }
}

async function calcScore(questionId: string, code: string) {
  const response = await fetch('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'python',
      version: '3.10.0',
      files: [
        {
          content: code,
        },
      ],
    }),
  });

  const outputData = await response.json();
  const output = outputData.run.output;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('id', questionId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const testCases = data.test_cases;
  const normalizedOutput = output.split('\n').join('');
  
  let score = 0;
  let correct = false;

  if (testCases === normalizedOutput) {
    score = 2;
    correct = true;
  } else {
    score = 0;
    correct = false;
  }

  return { 
    message: correct ? "ALL TEST CASES PASSED" : "TEST CASE FAILED", 
    pass_code: correct ? 100 : 0,
    score: score,
    correct: correct
  };
}
