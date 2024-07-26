import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import HandleSignOut from './handleSignOut';
import { CheckCircle, XCircle } from 'lucide-react'; // Importing icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface Submission {
  contest_id: string;
  question_id: string;
  correct: boolean;
}

interface Contest {
  id: string;
  name: string;
}

interface Question {
  id: string;
  name: string;
}

export default async function Dashboard() {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect('/login');
  }

  const { data: user, error: userError } = await supabase
    .from('accounts')
    .select('username, role')
    .eq('user_id', authData.user.id)
    .single();

  if (userError) {
    console.error(userError);
    redirect('/login');
  }

  const { data: submissions, error: submissionsError } = await supabase
    .from('submissions')
    .select('contest_id, question_id, correct')
    .eq('user_id', authData.user.id);

  if (submissionsError) {
    console.error(submissionsError);
  }

  // Fetch contest names
  const contestIds = submissions?.map(sub => sub.contest_id) || [];
  const { data: contests, error: contestsError } = await supabase
    .from('contests')
    .select('id, name')
    .in('id', contestIds);

  if (contestsError) {
    console.error(contestsError);
  }

  const questionIds = submissions?.map(sub => sub.question_id) || [];
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('id, name')
    .in('id', questionIds);

  if (questionsError) {
    console.error(questionsError);
  }

  const contestNameLookup = contests?.reduce<{ [key: string]: string }>((acc, contest: Contest) => {
    acc[contest.id] = contest.name;
    return acc;
  }, {}) || {};

  const questionNameLookup = questions?.reduce<{ [key: string]: string }>((acc, question: Question) => {
    acc[question.id] = question.name;
    return acc;
  }, {}) || {};

  async function handleSignOut() {
    await supabase.auth.signOut();
    redirect('/login');
  }

  return (
    <div className="container mx-auto p-4">
      {user?.role === 'ADMIN' ? ( <><h1 className="text-4xl font-bold mb-4 ">Dashboard</h1>
       <Link href={'dashboard/admin'}><Button className="m-4 float-right">View Admin Dashbord</Button></Link>
      <h1 className="text-4xl font-bold mb-4 ">Hi, {user?.username}</h1> </>) :
      (<>
        <h1 className="text-4xl font-bold mb-4 text-center">Dashboard</h1>
        <h1 className="text-4xl font-bold mb-4 text-center">Hi, {user?.username}</h1>
      </>)
        }


      <div className="mt-10 flex gap-10">
        <div className="w-full">
          <Card className="rounded shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">My Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {submissions!.length > 0 ? (
                <ul className="space-y-4">
                  {submissions?.map((submission: Submission, index: number) => (
                    <li key={index} className="border p-4 rounded-md flex justify-between items-center">
                      <span className="flex items-center">
                        <span className="mr-10">{index + 1}.</span>
                        <span>Contest: {contestNameLookup[submission.contest_id]}</span>
                        <span className="mx-10">Question: {questionNameLookup[submission.question_id]}</span>
                        <span className="flex items-center">
                          {submission.correct ? (<>Correct : <CheckCircle className="text-green-500 mx-2" /> </>): (<>Wrong : <XCircle className="text-red-500 mx-2" /></>)}
                        </span>
                      </span>
                      <Link href={`contests/solve/?questionId=${submission.question_id}`}>
                        {submission.correct ? <Button >View</Button> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No submissions yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <HandleSignOut />
    </div>
  );
}
