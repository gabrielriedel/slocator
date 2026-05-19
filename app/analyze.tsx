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

interface AnalyzeResult {
  buildingId: string;
  buildingName: string;
  confidence: number;
}

export default function AnalyzeScreen() {
  const { imageUri, imageName, imageMimeType } = useLocalSearchParams<{
    imageUri: string;
    imageName?: string;
    imageMimeType?: string;
  }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  function openResult(nextResult = result) {
    if (!imageUri || !nextResult) return;
    router.push({
      pathname: '/result',
      params: {
        imageUri,
        buildingId: nextResult.buildingId,
        confidence: String(nextResult.confidence),
      },
    });
  }

  async function handleAnalyze() {
    if (!imageUri) return;
    setError('');
    setResult(null);
    setStatus('Uploading photo to the model...');
    setLoading(true);

    try {
      console.log('[SLocator] Starting prediction for', imageUri, imageName, imageMimeType);
      const prediction = await predictBuilding(imageUri, {
        fileName: imageName,
        mimeType: imageMimeType,
      });
      console.log('[SLocator] Prediction result', prediction);
      setStatus(`Model returned ${prediction.buildingId}. Looking up building details...`);
      const building = getBuildingById(prediction.buildingId);

      if (!building) {
        const message = `The model returned "${prediction.buildingId}", but that building is not in data/buildings.ts yet.`;
        setError(message);
        Alert.alert('Unknown Building', message);
        setLoading(false);
        return;
      }

      const nextResult = {
        buildingId: prediction.buildingId,
        buildingName: building.name,
        confidence: prediction.confidence,
      };
      setResult(nextResult);
      setStatus(`Identified ${building.name}.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong running the model.';
      setError(message);
      setStatus('Analysis stopped before a result page could open.');
      Alert.alert('Analysis Failed', message);
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

        {(status || error || result) ? (
          <View style={[styles.statusCard, error ? styles.errorCard : result ? styles.successCard : null]}>
            {status ? <Text style={styles.statusText}>{status}</Text> : null}
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            {result ? (
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>Prediction</Text>
                <Text style={styles.resultName}>{result.buildingName}</Text>
                <Text style={styles.resultMeta}>
                  {result.buildingId} · {(result.confidence * 100).toFixed(1)}%
                </Text>
                <CalPolyButton
                  label="Open Full Result"
                  onPress={() => openResult(result)}
                  variant="secondary"
                  size="md"
                  style={styles.resultButton}
                />
              </View>
            ) : null}
          </View>
        ) : null}

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

  statusCard: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    backgroundColor: Colors.darkGreen,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gold + '66',
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  successCard: {
    borderColor: Colors.gold,
  },
  errorCard: {
    borderColor: '#FFB4A8',
  },
  statusText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Typography.fontSizeSM,
    lineHeight: 20,
  },
  errorMessage: {
    color: '#FFDDD8',
    fontSize: Typography.fontSizeSM,
    lineHeight: 20,
    fontWeight: Typography.fontWeightSemiBold,
  },
  resultBox: {
    gap: 2,
  },
  resultLabel: {
    color: Colors.gold,
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightSemiBold,
    textTransform: 'uppercase',
  },
  resultName: {
    color: Colors.white,
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
  },
  resultMeta: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.fontSizeSM,
  },
  resultButton: {
    marginTop: Spacing.sm,
  },

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
