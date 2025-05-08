import { checkIn } from '@/api/checkIn';
import { CameraView } from 'expo-camera';
import { Stack, router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  AppState,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function Index() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const { height } = Dimensions.get('window');
  const squareSize = 250;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
      console.log(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    middleRow: {
      flexDirection: 'row',
      height: 250,
    },
    focused: {
      width: 250,
      height: 250,
      borderColor: '#fff',
      borderWidth: 2,
      backgroundColor: 'transparent',
    },
  });

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: 'Overview',
          headerShown: false,
        }}
      />
      {Platform.OS === 'android' ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={async ({ data }) => {
          try {
            const parsed = JSON.parse(data);
            const courseId = parsed.course_id;

            if (!courseId) throw new Error('QR invalide');

            await checkIn(data, courseId);
            router.replace('/confirmation');
          } catch (err) {
            router.replace('/alreadyPresent');
          }
        }}
      />
      <View style={styles.container}>
        <View style={[styles.overlay, { height: (height - squareSize) / 2 }]} />

        <View style={styles.middleRow}>
          <View style={styles.overlay} />
          <View style={[styles.focused]} />
          <View style={styles.overlay} />
        </View>

        <View style={[styles.overlay, { height: (height - squareSize) / 2 }]} />
      </View>
    </SafeAreaView>
  );
}
