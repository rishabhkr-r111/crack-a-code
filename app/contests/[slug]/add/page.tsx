"use client"
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { AddQuestion } from './action';

export default function AddQuestionPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [testCases, setTestCases] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const contestId = searchParams.get("contestId") || "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("init-code", starterCode);
    formData.append("test-cases", testCases);
    formData.append("contest_id", contestId);

    try {
      await AddQuestion(formData);
      router.back();
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  };

  return (
    <Card className="w-1/2 mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create a Problem</CardTitle>
        <CardDescription>Dashboard to create a new Problem</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of Problem"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description of Problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="starter-code">Starter Code</Label>
              <Textarea
                id="starter-code"
                placeholder="Enter the starter code"
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="test-cases">Test Cases</Label>
              <Textarea
                id="test-cases"
                placeholder="Enter the test cases in JSON format"
                value={testCases}
                onChange={(e) => setTestCases(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-5">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}