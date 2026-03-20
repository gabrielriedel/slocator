import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getBuildingById } from '../data/buildings';
import BuildingCard from '../components/BuildingCard';
import CalPolyButton from '../components/CalPolyButton';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';

export default function ResultScreen() {
  const { imageUri, buildingId, confidence } = useLocalSearchParams<{
    imageUri: string;
    buildingId: string;
    confidence: string;
  }>();
  const router = useRouter();

  const building = getBuildingById(buildingId ?? '');
  const conf = parseFloat(confidence ?? '0');

  if (!building) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>🤔</Text>
          <Text style={styles.errorTitle}>Building Not Found</Text>
          <Text style={styles.errorBody}>
            The model predicted "{buildingId}" but that building isn't in the database yet.
            Add it to data/buildings.ts to see its info here.
          </Text>
          <CalPolyButton label="Try Another Photo" onPress={() => router.replace('/')} variant="secondary" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} stickyHeaderIndices={[0]}>

        {/* Sticky photo header */}
        <View style={styles.photoHeader}>
          <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />
          <View style={styles.photoGradient}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeIcon}>✅</Text>
              <Text style={styles.matchBadgeText}>Building Identified</Text>
            </View>
          </View>
        </View>

        {/* Building info card */}
        <BuildingCard building={building} confidence={conf} />

        {/* Bottom actions */}
        <View style={styles.actions}>
          <CalPolyButton
            label="Try Another Photo"
            onPress={() => router.replace('/')}
            variant="secondary"
            size="lg"
            icon="📷"
            style={{ flex: 1 }}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { flex: 1 },

  photoHeader: { position: 'relative' },
  photo: { width: '100%', height: 240 },
  photoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(21, 71, 52, 0.7)',
    justifyContent: 'flex-end',
    padding: Spacing.md,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  matchBadgeIcon: { fontSize: 16 },
  matchBadgeText: {
    color: Colors.white,
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightSemiBold,
    letterSpacing: 0.3,
  },

  actions: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  errorEmoji: { fontSize: 56, marginBottom: Spacing.sm },
  errorTitle: {
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightBold,
    color: Colors.green,
    textAlign: 'center',
  },
  errorBody: {
    fontSize: Typography.fontSizeMD,
    color: Colors.darkGray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
});
