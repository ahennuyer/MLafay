import 'react-native-url-polyfill/auto';

import ForgetPassword from './components/ForgetPassword';
import HomeScreen from './components/Home';
import { NavigationContainer }  from '@react-navigation/native';
import ResetPassword from './components/ResetPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
	const Stack = createNativeStackNavigator();  
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen}/>
				<Stack.Screen name="ForgetPassword" component={ForgetPassword} />
				<Stack.Screen name="NewPassword" component={ResetPassword} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}