import { Button, Input, Text } from "react-native-elements";
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { supabase } from '../libs/supabase';

export default function ResetPassword(event: any) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    console.log(event);
    async function handleResetPassword() {
        if(password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        
        const response = await supabase.auth.updateUser({ password});

        if(response.error) {
            setConfirmPassword("Il y a eu une erreur lors de la réinitialisaton du mot de passe..");
        } else {
            setSuccess(true);
            setPassword('');
            setConfirmPassword('');
        }
    };
    
    return(
        <View style={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>Mot de passe réinitialisé avec succès</Text>}
            <Input
              style={styles.input}
              placeholder="Nouveau mot de passe"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Input
              style={styles.input}
              placeholder="Confirmer le nouveau mot de passe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Button title="Réinitialiser le mot de passe" onPress={handleResetPassword} />
      </View>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: '80%',
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    errorText: {
      color: 'red',
      marginBottom: 20,
    },
    successText: {
      color: 'green',
      marginBottom: 20,
    },
  });







