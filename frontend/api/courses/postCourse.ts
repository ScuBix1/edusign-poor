import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
  start_time: string;
  end_time: string;
}

const postCourse = async (courseData: Omit<Course, 'id'>) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/courses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création du cours');
  }

  return response.json();
};

export default postCourse;
