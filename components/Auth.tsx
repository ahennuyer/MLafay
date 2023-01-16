import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../libs/supabase';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

export default function Auth() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    
	async function signInWithEmail() {
		setLoading(false);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<View>
			<View style={[ styles.verticallySpaced, styles.mt20 ]}>
				<Input
                    style={styles.inputField}
					label="Email"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					style={styles.inputField}
					label="Password"
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					rightIcon={
						<Pressable onPress={handlePasswordVisibility}>
							<MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
						</Pressable>
					}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={passwordVisibility}
					placeholder="Password"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={[ styles.verticallySpaced, styles.mt20 ]}>
				<Button title="Sign In" disabled={loading} onPress={() => signInWithEmail()} />
			</View>
			<View>
				<Button title="Sign Up" disabled={loading} onPress={() => signUpWithEmail()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	inputField: {
		width: '90%',
        paddingRight: 5
	},
	mt20: {
		marginTop: 250
	}
});
