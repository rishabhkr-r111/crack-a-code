import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

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

  return ( 
   <div className="container mx-auto mt-10">
      <Card className="rounded shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{contest.name}
          <Button className='float-right'>Add Questions</Button>
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
        {/* Placeholder for questions or additional contest content */}
        <Card className="rounded shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Contest Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md text-gray-600">Questions will be displayed here.</p>
            {/* Replace with actual questions content */}
          </CardContent>
        </Card>
      </div>
    </div>
  );


}

