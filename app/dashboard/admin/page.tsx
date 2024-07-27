"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

type LiveUser = {
  user_id: string;
  question_id: string;
  current_code: string;
  email?: string;
  name?: string;
  question_name?: string;
};

export default function AdminDashboard() {
  const [liveUsers, setLiveUsers] = useState<LiveUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<LiveUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        router.push('/login');
        return;
      }
      const { data: userData, error: userError } = await supabase
        .from('accounts')
        .select("*")
        .eq("user_id", data.user?.id)
        .single();
      if (userError || userData?.role !== 'ADMIN') {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router, supabase]);

  const fetchLiveUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('monitor')
        .select('*')
        .eq('is_live', true);
      if (error) throw error;
      const liveUsersWithDetails = await Promise.all(data.map(async (user: LiveUser) => {
        const [{ data: userData }, { data: questionData }] = await Promise.all([
          supabase.from('accounts').select('email, username').eq('user_id', user.user_id).single(),
          supabase.from('questions').select('name').eq('id', user.question_id).single()
        ]);
        return {
          ...user,
          email: userData?.email || 'Unknown User',
          name: userData?.username || 'Unknown User',
          question_name: questionData?.name || 'Unknown Question'
        };
      }));
      setLiveUsers(liveUsersWithDetails);
    } catch (error) {
      console.error('Error fetching live users:', error);
      setError('Failed to fetch live users. Please try again.');
    }
  }, [supabase]);

  useEffect(() => {
    fetchLiveUsers();

    const channel = supabase
      .channel('monitor_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'monitor' },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setLiveUsers((prevUsers) => 
              prevUsers.map((user) => 
                user.user_id === payload.new.user_id ? { ...user, ...payload.new } : user
              )
            );
            if (selectedUser && selectedUser.user_id === payload.new.user_id) {
              setSelectedUser((prevSelected) => ({ ...prevSelected!, ...payload.new }));
            }
          } else if (payload.eventType === 'INSERT') {
            fetchLiveUsers();
          } else if (payload.eventType === 'DELETE') {
            setLiveUsers((prevUsers) => 
              prevUsers.filter((user) => user.user_id !== payload.old.user_id)
            );
            if (selectedUser && selectedUser.user_id === payload.old.user_id) {
              setSelectedUser(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchLiveUsers, selectedUser]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4 flex h-screen">
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <h2 className="text-xl font-semibold mb-2">Live Users</h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {liveUsers.map((user) => (
            <Card 
              key={`${user.user_id}-${user.question_id}`} 
              className={`mb-4 cursor-pointer ${
                selectedUser?.user_id === user.user_id ? 'bg-slate-500' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <CardHeader>
                <CardTitle>user : {user.name}</CardTitle>
                <CardContent>
                  <div>
                    Email : {user.email}
                  </div>
                  <div>
                    Question : {user.question_name}
                  </div>
                </CardContent>
                
              </CardHeader>
            </Card>
          ))}
        </ScrollArea>
      </div>
      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-semibold mb-2">Code Editor</h2>
        <CodeMirror
          value={selectedUser?.current_code || '// Select a user to view their code'}
          height="calc(100vh - 100px)"
          extensions={[python()]}
          theme="dark"
          editable={false}
        />
      </div>
    </div>
  );
}