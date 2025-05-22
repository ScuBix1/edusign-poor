import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

const getCourses = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des cours');
  }

  const dataResponse = response.json();
  return dataResponse;
};

export default getCourses;
