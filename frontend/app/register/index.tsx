import { register } from '@/api/auth/register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  const handleRegister = async () => {
    try {
      const result = await register(
        name,
        email,
        password,
        confirmationPassword,
        selectedRole
      );
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.setItem('token', result.token);
      await AsyncStorage.setItem('user_id', result.user.id.toString());
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
        Inscription
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}
      >
        <TextInput
          label='Nom'
          value={name}
          onChangeText={(value) => setName(value)}
          style={{ width: 200, height: 20 }}
        />
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
        <TextInput
          label='Confirmation mot de passe'
          value={confirmationPassword}
          onChangeText={(value) => setConfirmationPassword(value)}
          style={{ width: 200, height: 20 }}
        />
        <TextInput
          label='Role'
          value={selectedRole}
          onChangeText={(value) => setSelectedRole(value)}
          style={{ width: 200, height: 20 }}
        />

        <Link href={'/'} replace>
          {' '}
          Déjà un compte ?
        </Link>
        <Button
          style={{ borderWidth: 1, borderColor: theme.colors.primary }}
          onPress={handleRegister}
        >
          Se connecter pour signer
        </Button>
      </View>
    </View>
  );
}
