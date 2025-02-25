import * as Linking from 'expo-linking';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { supabase } from '../libs/supabase';

const extractToken = (url: string) => {
	const match = url.match(/access_token=(.*?)(&|$)/);
	if (match) {
		return match[1];
	}
	return null;
};

export default function ForgetPassword({ navigation }: any) {
	const [ email, setEmail ] = useState('');
	const [ loading, setLoading ] = useState(false);

	async function handleForget() {
		try {
			setLoading(true);
			const response = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: 'exp://192.168.1.16:19000/--/newpassword'
			});
			if (response.error) {
				Alert.alert('Erreur');
			} else {
				Alert.alert('Email de réinitialisation de mot de passe envoyé avec succès');
			}
		} catch (error) {
			Alert.alert("Erreur lors de l'envoi de l'email de réinitialisation de mot de passe");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		async function handleInitialUrl() {
			const initialUrl = await Linking.getInitialURL();
			console.log('URL Initiale: ', initialUrl);
			if (initialUrl) {
				const token = extractToken(initialUrl);
				if (token) {
					navigation.navigate('NewPassword', { token });
				}
			}
		}
		handleInitialUrl();
		const subscription = Linking.addEventListener('url', (event) => {
			const token = extractToken(event.url);
			if (token) {
				navigation.navigate('NewPassword', { token });
			}
		});
		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.inputReset}>
				<Input
					label="Email"
					leftIcon={<FontAwesome name="envelope" size={25} />}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>
			</View>
			<View>
				<TouchableOpacity>
					<Button
						title={loading ? 'Loading' : 'Send email'}
						disabled={loading}
						onPress={() => { handleForget();}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		marginTop: 35,
		paddingHorizontal: 20,
		paddingBottom: 20
	},
	inputReset: {
		width: '90%',
		alignSelf: 'center'
	}
});
