import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Contest {
  id: number;
  name: string;
  description: string;
  slug: string;
  start_at: string;
  end_at: string;
}

interface Question {
  id: number;
  name: string;
}

interface Submission {
  user_id: string;
  score: number;
}

interface Ranking {
  user_id: string;
  ranking: number;
  email: string;
}

interface ContestQuestionsProps {
  params: { slug: string };
}

export default async function ContestQuestions({ params }: ContestQuestionsProps) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  const { data: userData } = await supabase.from('accounts').select("*").eq("user_id", data.user.id).single();
  console.log(userData);
  const role = userData?.role;

  const slug = params.slug;
  const { data: contest } = await supabase
    .from('contests')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!contest) {
    console.error("Some error occurred while fetching contests");
    return null;
  }

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('contest_id', contest.id);

  if (!questions) {
    console.error("Some error occurred while fetching questions");
    return null;
  }

  const { data: submissions } = await supabase
    .from('submissions')
    .select('user_id, score')
    .eq('contest_id', contest.id);

  if (!submissions) {
    console.error("Some error occurred while fetching submissions");
    return null;
  }

  const rankings: Omit<Ranking, 'email'>[] = Object.entries(
    submissions.reduce((acc: Record<string, number>, { user_id, score }) => {
      if (!acc[user_id]) {
        acc[user_id] = 0;
      }
      acc[user_id] += score;
      return acc;
    }, {})
  )
    .map(([user_id, score]) => ({ user_id, ranking: score }))
    .sort((a, b) => b.ranking - a.ranking);

  // Fetch email addresses for all users in the rankings
  const { data: username, error: nameError } = await supabase
    .from('accounts')
    .select('user_id, username')
    .in('user_id', rankings.map(r => r.user_id));

  if (nameError) {
    console.error("Error fetching user:", nameError);
    return null;
  }

  // Create a map of user IDs to email addresses
  const emailMap = new Map(username?.map(user => [user.user_id, user.username]) || []);

  // Add email to rankings
  const rankingsWithEmail: Ranking[] = rankings.map(ranking => ({
    ...ranking,
    email: emailMap.get(ranking.user_id) || 'Email not found'
  }));

  return (
    <div className="container mx-auto mt-10">
      <Card className="rounded shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            {contest.name}
            {role === "ADMIN" && (
              <Link href={`${contest.slug}/add?contestId=${contest.id}`}>
                <Button className='float-right'>Add Questions</Button>
              </Link>
            )}
          </CardTitle>
          <CardDescription className="text-md">{contest.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex gap-5">
            <p className="text-sm text-green-500">Starts at: {dayjs(contest.start_at).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p className="text-sm text-red-500">Ends at: {dayjs(contest.end_at).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 flex gap-10">
        <div className="w-full">
          <Card className="rounded shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Contest Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {questions.length > 0 ? (
                <ul className="space-y-4">
                  {questions.map((question: Question, idx: number) => (
                    <li key={question.id} className="border p-4 rounded-md flex justify-between">
                      <Link href={`solve/?questionId=${question.id}`}>
                        <h3 className="text-lg text-blue-400">{idx + 1}. {question.name}</h3>
                      </Link>
                      <Link href={`solve/?questionId=${question.id}`}>
                        <Button>Solve</Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No questions added yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2">
          <Card className="rounded shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              {rankingsWithEmail.length > 0 ? (
                <ul className="space-y-4">
                  {rankingsWithEmail.map((ranking: Ranking, idx: number) => (
                    <li key={ranking.user_id} className="border p-4 rounded-md flex flex-col">
                      <div className="flex justify-between">
                        <p className="text-lg">{idx + 1}. {ranking.email}</p>
                        <p className="text-lg">Score: {ranking.ranking}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No rankings available yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}