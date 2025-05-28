import { Stack, usePathname } from 'expo-router';

export default function RootLayout() {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
