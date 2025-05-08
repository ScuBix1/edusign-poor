import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkIn = async (qrData: string, courseId: number) => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(
    'http://10.26.134.241:8000/api/attendance/check-in',
    {
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
    }
  );

  if (!response.ok) {
    throw new Error('Erreur serveur');
  }

  const dataResponse = response.json();
  return dataResponse;
};
