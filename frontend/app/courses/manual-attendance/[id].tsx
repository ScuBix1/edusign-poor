import markAttendanceManually from '@/api/attendances/markAttendanceManually';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function ManualAttendance() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMarkAttendance = async () => {
    try {
      const userRole = await AsyncStorage.getItem('user_role');
      if (userRole !== 'teacher') {
        throw new Error(
          'Vous devez être un professeur pour marquer la présence'
        );
      }

      await markAttendanceManually(Number(id), email);
      setSuccess('Présence marquée avec succès');
      setEmail('');
      setTimeout(() => {
        router.replace('/courses');
      }, 350);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 30,
          marginTop: 50,
          textAlign: 'center',
          color: theme.colors.primary,
        }}
      >
        Marquer la présence manuellement
      </Text>

      <TextInput
        label="Email de l'élève"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 16 }}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      {error ? (
        <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
      ) : null}

      {success ? (
        <Text style={{ color: 'green', marginBottom: 16 }}>{success}</Text>
      ) : null}

      <Button
        mode='contained'
        onPress={handleMarkAttendance}
        style={{ marginTop: 16 }}
      >
        Marquer la présence
      </Button>

      <Button
        mode='outlined'
        onPress={() => router.replace('/courses')}
        style={{ marginTop: 16 }}
      >
        Retour
      </Button>
    </View>
  );
}
