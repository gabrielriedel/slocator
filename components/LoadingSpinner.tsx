import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Analyzing building…' }: LoadingSpinnerProps) {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.12,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Outer ring */}
      <View style={styles.ring}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
          <View style={styles.spinnerDot} />
        </Animated.View>

        {/* Center logo */}
        <Animated.View style={[styles.center, { transform: [{ scale: pulse }] }]}>
          <Text style={styles.mustang}>🐴</Text>
        </Animated.View>
      </View>

      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>Running model inference…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  ring: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  spinner: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.lightGray,
    borderTopColor: Colors.gold,
    borderRightColor: Colors.gold,
  },
  spinnerDot: {
    position: 'absolute',
    top: -4,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gold,
  },
  center: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mustang: { fontSize: 32 },

  message: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.green,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subMessage: {
    fontSize: Typography.fontSizeSM,
    color: Colors.midGray,
    textAlign: 'center',
  },
});
