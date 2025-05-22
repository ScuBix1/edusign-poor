import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

const getAttendances = async (courseId: number) => {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(
    `${BASE_URL}/api/courses/${courseId}/attendance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Il y a eu un problème lors de la récupération des présences !'
    );
  }

  const data = await response.json();
  return data;
};

export default getAttendances;
