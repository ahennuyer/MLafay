import * as Linking from 'expo-linking';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../libs/supabase';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword({ navigation }: any) {
	const [ email, setEmail ] = useState('');
	const [ loading, setLoading ] = useState(false);
	
	async function forget() {
		try {
			setLoading(true);
			const response = await supabase.auth.resetPasswordForEmail(email, {
				// TODO redirect
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
		function extractTokenFromURL(url: any) {
			console.log('url', url);

			const params = new URL(url).searchParams;
			return params.get('token');
		}
		const subscription = Linking.addEventListener('url', (event) => {
			console.log('url2', event);
			const { url } = event;
			const token = extractTokenFromURL(url);
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
						onPress={() => {
							forget();
						}}
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
	},
	btnReset: {}
});
