import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

const deleteCourseAttendances = async (courseId: number) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(
    `${BASE_URL}/api/courses/${courseId}/attendances`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression des présences');
  }

  return response.json();
};

export default deleteCourseAttendances;
