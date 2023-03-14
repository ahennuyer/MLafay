import 'react-native-url-polyfill/auto';

import { useEffect, useState } from 'react';

import Account from './Account';
import Login from './Login';
import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { supabase } from '../libs/supabase';

export default function Home() {
	const [ session, setSession ] = useState<Session | null>(null);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
	}, []);
  
	return (
		<View>
      	    {session && session.user ? <Account key={session.user.id} session={session} /> : <Login />}
			<StatusBar style="auto" />
		</View>
	);
}