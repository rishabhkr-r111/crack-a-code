"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { AlertCircle, Monitor, Play } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { GetQuestionById } from './action';
import { useSearchParams } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/lang-python';
import { handleSubmit } from './submit';
import { createClient } from '@/utils/supabase/client';
import { getUser } from '@/utils/user';
import { useRouter } from 'next/navigation';

function SolvePageContent() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId") || "";
  const [contestId, setContestId] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data, error: e } = await supabase.auth.getUser();
      if (e || !data?.user) {
        router.push('/login');
      }
    };
    checkAuth();

    GetQuestionById(questionId).then((data) => {
      setQuestion(data.name);
      setDescription(data.description);
      setContestId(data.contest_id);
      alreadySubmitted();

      const debounceTimer = setTimeout(() => monitorCode(true), 500);

      return () => clearTimeout(debounceTimer);
    });

  }, [questionId, code]);

  const alreadySubmitted = async () => {
    const supabase = createClient();
    const currentUser = await getUser();
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('question_id', questionId)
      .eq('user_id', currentUser?.user.id)
      .eq('correct', true)
      .single();

    if (data) {
      setCode(data?.code || '');
      setOutput("Already Submitted \n");
      setIsLoading(true);
    }
  };

  const monitorCode = async (is_Live: boolean) => {
    const supabase = createClient();
    const currentUser = await getUser();
    const { data, error: e } = await supabase
      .from('monitor')
      .select('*')
      .eq('user_id', currentUser?.user.id)
      .single();

    if (e && e.code !== 'PGRST116') {
      console.error('Error checking monitor entry:', e);
      return;
    }

    if (data) {
      const { error } = await supabase
        .from('monitor')
        .update({
          current_code: code,
          is_live: is_Live,
          question_id: questionId,
        })
        .eq('user_id', currentUser?.user.id);
    } else {
      const { error } = await supabase
        .from('monitor')
        .insert({
          user_id: currentUser?.user.id,
          current_code: code,
          is_live: is_Live,
          question_id: questionId,
        });
    }

    if (error) {
      console.error('Error updating monitor entry:', error);
    }
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    setError('');

    const { data, error } = await handleSubmit(questionId, contestId, code);
    if (error) {
      setError(error);
    } else {
      if (data?.pass_code === 100) {
        setOutput("Submitted \n" + data.message);
      } else {
        setOutput("Submitted \n" + data?.message);
        setIsLoading(false);
      }
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setError('');
    setOutput('');

    try {
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

      const data = await response.json();

      if (data.run.output) {
        setOutput(data.run.output);
      } else if (data.run.stderr) {
        setError(data.run.stderr);
      }
    } catch (err) {
      setError('An error occurred while running the code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-4 md:border-r">
        <h2 className="text-2xl font-bold mb-4">{question}</h2>
        <p className="mb-4">{description}</p>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
        <CodeMirror
          value={code}
          height="400px"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          theme={oneDark}
          className="flex-grow mb-4 font-mono"
        />
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Button onClick={handleRunCode} disabled={isLoading} className="flex-1">
            <Play className="mr-2 h-4 w-4" /> Run Code
          </Button>
          <Button onClick={handleSubmitCode} disabled={isLoading} className="flex-1">Submit</Button>
        </div>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {output && (
          <div className="border p-4 rounded-md">
            <h3 className="font-bold mb-2">Output:</h3>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SolvePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SolvePageContent />
    </Suspense>
  );
}
