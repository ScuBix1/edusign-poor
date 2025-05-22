import { login } from '@/api/auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('user_role');
      await AsyncStorage.setItem('token', result.token);
      await AsyncStorage.setItem('user_id', result.user.id.toString());
      await AsyncStorage.setItem('user_role', result.user.role);
      router.replace('/scanner');
    } catch (error: any) {
      console.error('Erreur :', error.message);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 20,
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 30,
          color: theme.colors.primary,
        }}
      >
        Connexion
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}
      >
        <TextInput
          label='Email'
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={{ width: 200, height: 20 }}
        />
        <TextInput
          label='Mot de passe'
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={{ width: 200, height: 20 }}
        />
        <Link href={'/register'} replace>
          Pas encore de compte ?
        </Link>
        <Button
          style={{ borderWidth: 1, borderColor: theme.colors.primary }}
          onPress={handleLogin}
        >
          Se connecter pour signer
        </Button>
      </View>
    </View>
  );
}
