import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

const markAttendanceManually = async (courseId: number, email: string) => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/attendance/manual`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      course_id: courseId,
      email: email,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || 'Une erreur est survenue lors du marquage de la présence'
    );
  }

  return response.json();
};

export default markAttendanceManually;
