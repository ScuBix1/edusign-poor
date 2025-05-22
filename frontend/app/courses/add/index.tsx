import { createCourse } from '@/api/courses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function AddCourse() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddCourse = async () => {
    try {
      const userRole = await AsyncStorage.getItem('user_role');
      if (userRole !== 'teacher') {
        throw new Error('Vous devez être un professeur pour ajouter un cours');
      }

      await createCourse({
        name,
        code,
        description,
        start_time: startTime,
        end_time: endTime,
      });

      router.replace('/courses');
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
        Ajouter un cours
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}
      >
        <TextInput
          label='Nom du cours'
          value={name}
          onChangeText={(value) => setName(value)}
          style={{ width: 200, height: 20 }}
        />
        <TextInput
          label='Code du cours'
          value={code}
          onChangeText={(value) => setCode(value)}
          style={{ width: 200, height: 20 }}
        />
        <TextInput
          label='Description'
          value={description}
          onChangeText={(value) => setDescription(value)}
          style={{ width: 200, height: 20 }}
        />
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

        <Link href={'/courses'} replace>
          Retour à la liste des cours
        </Link>
        <Button
          style={{ borderWidth: 1, borderColor: theme.colors.primary }}
          onPress={handleAddCourse}
        >
          Ajouter le cours
        </Button>
      </View>
    </View>
  );
}
