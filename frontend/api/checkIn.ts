import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

export const checkIn = async (qrData: string, courseId: number) => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/attendance/check-in`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      course_id: courseId,
      qr_data: qrData,
    }),
  });

  if (!response.ok) {
    throw new Error('Erreur serveur');
  }

  const dataResponse = response.json();
  return dataResponse;
};
