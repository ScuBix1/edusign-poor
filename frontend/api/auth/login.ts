export const login = async (email: string, password: string) => {
  const response = await fetch('http://10.26.135.213:8000/api/login', {
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
