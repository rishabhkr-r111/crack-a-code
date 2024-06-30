import dayjs from 'dayjs';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


async function Contests() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const { data: contests} = await supabase
    .from('contests')
    .select('*')

  if (!contests) {
    console.error("some error occured" );
    return;
  }
  
  const ongoing = contests.filter(contest => contest.end_at > new Date().toISOString());
  // const upcoming = contests.filter(contest => contest.created_at > new Date().toISOString());
  // const finished = contests.filter(contest => contest.end_at < new Date().toISOString());
  const now = dayjs();

  // const ongoing = contests.filter(contest => now.isAfter(dayjs(contest.created_at)) && now.isBefore(dayjs(contest.end_at)));
  // const upcoming = contests.filter(contest => now.isBefore(dayjs(contest.created_at)));
  // const finished = contests

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Contests</h1>
      <Link href={"/contests/new"}><Button className='float-right mr-4'>Create Contest</Button></Link>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Ongoing</h2>
        <div className="flex gap-5 ">
        {ongoing.length ? ongoing.map(contest => (
          <Link href={`/contests/${contest.slug}`} key={contest.id}>
          <Card key={contest.id} className="rounded shadow w-[350px] hover:bg-green-200 hover:text-black">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{contest.name}</CardTitle>
              <CardDescription >{contest.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ends at: {dayjs(contest.end_at).format('YYYY-MM-DD HH:mm:ss')}</p>
            </CardContent>
          </Card>
          </Link>
        )) : <p>No ongoing contests.</p>}
      </div>
      </section>
      
      {/* <section>
        <h2 className="text-xl font-semibold mb-2">Upcoming</h2>
        <ul>
          {upcoming.length ? upcoming.map(contest => (
            <li key={contest.id} className="p-4 rounded shadow mb-2">
              <h3 className="text-lg font-bold">{contest.name}</h3>
              <p>{contest.description}</p>
              <p>Starts at: {dayjs(contest.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
            </li>
          )) : <p>No upcoming contests.</p>}
        </ul>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Finished</h2>
        <ul>
          {finished.length ? finished.map(contest => (
            <li key={contest.id} className="p-4  rounded shadow mb-2">
              <h3 className="text-lg font-bold">{contest.name}</h3>
              <p>{contest.description}</p>
              <p>Ended at: {dayjs(contest.end_at).format('YYYY-MM-DD HH:mm:ss')}</p>
            </li>
          )) : <p>No finished contests.</p>}
        </ul>
      </section>
          */}
    </div> 
  );
}

export default Contests;
