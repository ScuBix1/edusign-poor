import Constants from 'expo-constants';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  role?: string
) => {
  const cleanedRole = role?.trim().toLowerCase();
  const roleSelected = cleanedRole === 'teacher' ? 'teacher' : 'student';

  const response = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
      role: roleSelected,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Informations invalides');
  }

  const data = response.json();
  return data;
};
