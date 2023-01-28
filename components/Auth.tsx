import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

import { supabase } from '../libs/supabase';
import { useNavigation } from '@react-navigation/native';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

export default function Auth() {
	const navigation = useNavigation();
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
			<View style={[ styles.inputField, styles.verticallySpaced, styles.mt250 ]}>
				<Input
					label="Email"
					leftIcon={<FontAwesome name="envelope" size={25} />}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={styles.inputField}>
				<Input
					label="Password"
					leftIcon={<FontAwesome name="lock" size={25} />}
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
			<View style={[ styles.btnSignIn ]}>
				<Button title="Sign In" disabled={loading} onPress={() => signInWithEmail()} />
			</View>
			<View style={styles.btnSignUp}>
				<Button type="outline" title="Sign Up" disabled={loading} onPress={() => signUpWithEmail()} />
			</View>
			<View style={styles.forgetPwd}>
				<Button
					type="outline"
					buttonStyle={styles.forgetPwdBtn}
					title="Forget Password ?"
					titleStyle={styles.titleBtnPwd}
					onPress={() => navigation.navigate('Reset')}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'center'
	},
	icon: {
		paddingRight: 4
	},
	inputField: {
		width: '90%',
		alignSelf: 'center'
	},
	mt250: {
		marginTop: 250
	},
	btnSignIn: {
		width: '50%',
		paddingBottom: 4,
		alignSelf: 'center'
	},
	btnSignUp: {
		width: '50%',
		alignSelf: 'center'
	},
	forgetPwd: {
		paddingTop: 10,
		alignSelf: 'center'
	},
	forgetPwdBtn: {
		borderColor: 'transparent'
	},
	titleBtnPwd: {
		color: 'blue'
	}
});
