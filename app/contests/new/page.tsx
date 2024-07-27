"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { createContest } from './action';

export default function CreateContestPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const response = await createContest({ name, description, startTime, endTime });

    if (response.success) {
      router.push('/contests');
    } else {
      alert(`Error: ${response.error}`); 
    }
  };

  return (
    <Card className="w-[550px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create Contest</CardTitle>
        <CardDescription>Dashboard to create a new contest</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of Contest"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description of Contest"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="start-time">Select Contest Start Time</Label>
              <Input
                id="start-time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="end-time">Select Contest End Time</Label>
              <Input
                id="end-time"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
