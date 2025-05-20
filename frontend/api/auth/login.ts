import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Email ou mot de passe invalide');
  }

  const data = await response.json();
  return data;
};
