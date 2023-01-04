import 'react-native-url-polyfill/auto';

import { useEffect, useState } from 'react';

import Account from './components/Account';
import Auth from './components/Auth';
import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { supabase } from './libs/supabase';

export default function App() {
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
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
			<StatusBar style="auto" />
		</View>
	);
}