"use client"
import React, { useState, useEffect } from 'react';
import { AlertCircle, Play } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GetQuestionById } from './action';
import { useSearchParams } from 'next/navigation';


export default function SolvePage() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId") || "";
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    GetQuestionById(questionId).then((data) => {
      console.log(data);
      setQuestion(data.name);
      setDescription(data.description);
    });
  }, []);


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
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-2xl font-bold mb-4">{question}</h2>
        <p className="mb-4">{description}</p>
      </div>
      <div className="w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your Python code here..."
          className="flex-grow mb-4 font-mono"
        />
        <Button onClick={handleRunCode} disabled={isLoading} className="mb-4">
          <Play className="mr-2 h-4 w-4" /> Run Code
        </Button>
        <Button className="mb-4">
           Submit
        </Button>
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