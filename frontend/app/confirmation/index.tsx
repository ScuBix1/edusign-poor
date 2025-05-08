import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function Index() {
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
    </SafeAreaView>
  );
}
