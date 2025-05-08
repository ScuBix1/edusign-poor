import { Link, Stack } from 'expo-router';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { useCameraPermissions } from 'expo-camera';
import { useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = permission?.granted ?? false;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        justifyContent: 'space-around',
        paddingVertical: 80,
      }}
    >
      <Stack.Screen options={{ title: 'Overview', headerShown: false }} />
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 40,
        }}
      >
        Scan pour signer
      </Text>
      <View style={{ gap: 20 }}>
        <Pressable onPress={requestPermission}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 20,
              textAlign: 'center',
              borderWidth: 1,
              borderColor: theme.colors.primary,
              borderRadius: 30,
              paddingHorizontal: 20,
            }}
          >
            Permission Caméra
          </Text>
        </Pressable>
        <Link href={'/scanner/scan-qr'} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                {
                  color: theme.colors.primary,
                  fontSize: 20,
                  textAlign: 'center',
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                  borderRadius: 30,
                  paddingHorizontal: 20,
                },
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
