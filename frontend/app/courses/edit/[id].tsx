import deleteCourseAttendances from '@/api/attendances/deleteCourseAttendances';
import updateCourse from '@/api/courses/updateCourse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function EditCourse() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleUpdateCourse = async () => {
    try {
      const userRole = await AsyncStorage.getItem('user_role');
      if (userRole !== 'teacher') {
        throw new Error('Vous devez être un professeur pour modifier un cours');
      }

      await deleteCourseAttendances(Number(id));

      await updateCourse(Number(id), {
        start_time: startTime,
        end_time: endTime,
      });

      router.replace('/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
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
        Modifier les horaires du cours
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}
      >
        <TextInput
          label='Date de début (YYYY-MM-DD HH:mm)'
          value={startTime}
          onChangeText={(value) => setStartTime(value)}
          style={{ width: 200, height: 20 }}
        />
        <TextInput
          label='Date de fin (YYYY-MM-DD HH:mm)'
          value={endTime}
          onChangeText={(value) => setEndTime(value)}
          style={{ width: 200, height: 20 }}
        />

        {error && (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        )}
        <Button
          mode='outlined'
          onPress={() => router.replace('/courses')}
          style={{ marginTop: 16 }}
        >
          Retour
        </Button>
        <Button
          style={{ borderWidth: 1, borderColor: theme.colors.primary }}
          onPress={handleUpdateCourse}
        >
          Mettre à jour les horaires
        </Button>
      </View>
    </View>
  );
}
