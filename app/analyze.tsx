import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { predictBuilding } from '../services/modelService';
import { getBuildingById } from '../data/buildings';
import CalPolyButton from '../components/CalPolyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

export default function AnalyzeScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!imageUri) return;
    setLoading(true);

    try {
      const prediction = await predictBuilding(imageUri);
      const building = getBuildingById(prediction.buildingId);

      if (!building) {
        Alert.alert('Unknown Building', "The model returned a building ID we don't recognize yet. Please add it to data/buildings.ts.");
        setLoading(false);
        return;
      }

      router.push({
        pathname: '/result',
        params: {
          imageUri,
          buildingId: prediction.buildingId,
          confidence: String(prediction.confidence),
        },
      });
    } catch (err) {
      Alert.alert('Analysis Failed', 'Something went wrong running the model. Check the console for details.');
      console.error('[SLocator] Model error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (!imageUri) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No image provided.</Text>
          <CalPolyButton label="Go Back" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>

        {/* Photo preview */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay}>
            <Text style={styles.overlayText}>📸  Ready to analyze</Text>
          </View>
        </View>

        {/* Instructions card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏛️  Identify This Building</Text>
          <Text style={styles.cardBody}>
            SLocator will analyze the photo and match it to a Cal Poly campus building using a trained visual model.
            Make sure the building is clearly visible for best results.
          </Text>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            {['Keep the building centered in frame', 'Good lighting improves accuracy', 'Avoid extreme angles'].map(
              (tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <View style={styles.tipDot} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Loading or CTA */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner message="Identifying building…" />
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <CalPolyButton
              label="Analyze Building"
              onPress={handleAnalyze}
              variant="primary"
              size="lg"
              icon="🔍"
              style={styles.analyzeBtn}
            />
            <CalPolyButton
              label="Use Different Photo"
              onPress={() => router.back()}
              variant="ghost"
              size="md"
            />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.darkGreen },
  container: { flexGrow: 1, backgroundColor: Colors.darkGreen },

  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 280 },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 53, 39, 0.65)',
    padding: Spacing.sm,
    alignItems: 'center',
  },
  overlayText: {
    color: Colors.white,
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightSemiBold,
    letterSpacing: 0.3,
  },

  card: {
    margin: Spacing.md,
    backgroundColor: Colors.lightGreen,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  cardTitle: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.gold,
    marginBottom: Spacing.sm,
  },
  cardBody: {
    fontSize: Typography.fontSizeMD,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 23,
    marginBottom: Spacing.md,
  },

  tipsContainer: { gap: Spacing.xs },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    flexShrink: 0,
  },
  tipText: {
    fontSize: Typography.fontSizeSM,
    color: 'rgba(255,255,255,0.7)',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    marginTop: Spacing.lg,
  },

  btnContainer: {
    padding: Spacing.lg,
    gap: Spacing.md,
    alignItems: 'stretch',
  },
  analyzeBtn: { width: '100%' },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  errorText: {
    fontSize: Typography.fontSizeLG,
    color: Colors.darkGray,
    marginBottom: Spacing.md,
  },
});
