import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Button } from 'react-native-paper';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: '#2e7d32',
          textAlign: 'center',
        }}
      >
        Vous êtes présent !
      </Text>

      <ConfettiCannon
        count={100}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        fadeOut={true}
        fallSpeed={3000}
        explosionSpeed={500}
      />
      <Button
        mode='outlined'
        onPress={() => router.replace('/scanner')}
        style={{ marginTop: 16 }}
      >
        Retour
      </Button>
    </SafeAreaView>
  );
}
