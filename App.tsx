import 'react-native-url-polyfill/auto';

import { useEffect, useState } from 'react';

import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import Reset from './components/Reset';
import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './libs/supabase';

export default function App() {
	const [ session, setSession ] = useState<Session | null>(null);
	const Stack = createNativeStackNavigator();
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
	}, []);
  
	return (
		// <View>
		// 	<Home />
		// 	<StatusBar style="auto" />
		// </View>
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home}/>
				<Stack.Screen name="Reset" component={Reset} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}