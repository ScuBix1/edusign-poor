import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
  start_time: string;
  end_time: string;
}

export const getCourses = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des cours');
  }
  return response.json();
};

export const createCourse = async (courseData: Omit<Course, 'id'>) => {
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
