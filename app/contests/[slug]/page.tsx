import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ContestQuestions({ params }: { params: { slug: string } }) {
  const supabase = createClient();
   const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const slug  = params.slug;
  const { data: contest } = await supabase
    .from('contests')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!contest) {
    console.error("some error ocuur while fetching contests");
    return;
  }

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('contest_id', contest.id)

  if (!questions) {
    console.error("some error ocuur while fetching questions");
    return;
  }

  return ( 
   <div className="container mx-auto mt-10">
      <Card className="rounded shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{contest.name}
          <Link href={`${contest.slug}/add?contestId=${contest.id}`}><Button className='float-right'>Add Questions</Button></Link>
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

      <div className="mt-10">
        <Card className="rounded shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Contest Questions</CardTitle>
          </CardHeader>
          <CardContent>
            {questions.length > 0 ? (
              <ul className="space-y-4" >
                {questions.map((question, idx) => (
                  <li key={question.id} className="border p-4 rounded-md flex justify-between">
                    <Link href={`solve/?questionId=${question.id}`}><h3 className="text-lg text-blue-400">{idx+1}. {question.name}</h3></Link>
                    <Link href={`solve/?questionId=${question.id}`}><Button>Solve</Button></Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions added yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );


}

