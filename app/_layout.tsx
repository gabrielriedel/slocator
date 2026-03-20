import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.green },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: Colors.offWhite },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="analyze"
          options={{
            title: 'Analyze Photo',
            headerStyle: { backgroundColor: Colors.darkGreen },
          }}
        />
        <Stack.Screen
          name="result"
          options={{
            title: 'Building Identified',
            headerStyle: { backgroundColor: Colors.green },
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'About SLocator',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
