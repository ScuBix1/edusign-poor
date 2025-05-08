export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  role?: string
) => {
  const roleSelected = role === 'teacher' ? 'teacher' : 'student';
  const response = await fetch('http://10.26.134.241:8000/api/register', {
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
    throw new Error('Informations invalide');
  }

  const data = response.json();
  return data;
};
