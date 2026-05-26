import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  function openAnalyze(asset: ImagePicker.ImagePickerAsset) {
    router.push({
      pathname: '/analyze',
      params: {
        imageUri: asset.uri,
        imageName: asset.fileName ?? '',
        imageMimeType: asset.mimeType ?? '',
      },
    });
  }

  async function requestPermission(type: 'camera' | 'library'): Promise<boolean> {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'SLocator needs camera access to identify buildings. Please enable it in Settings.',
          [{ text: 'OK' }]
        );
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Photo Library Permission Required',
          'SLocator needs photo library access to analyze your images.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  }

  async function handleTakePhoto() {
    const ok = await requestPermission('camera');
    if (!ok) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets[0]) {
      openAnalyze(result.assets[0]);
    }
  }

  async function handlePickFromLibrary() {
    const ok = await requestPermission('library');
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets[0]) {
      openAnalyze(result.assets[0]);
    }
  }

  async function handleTrySample() {
    const asset = Asset.fromModule(require('../assets/baker_ex.jpg'));
    await asset.downloadAsync();
    if (!asset.localUri) return;
    router.push({
      pathname: '/analyze',
      params: {
        imageUri: asset.localUri,
        imageName: 'baker_ex.jpg',
        imageMimeType: 'image/jpeg',
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header area */}
        <View style={styles.header}>
          {/* Logo circle */}
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🐴</Text>
          </View>

          <Text style={styles.appName}>SLocator</Text>
          <Text style={styles.tagline}>Identify any Cal Poly building{'\n'}instantly with your camera</Text>

          {/* Cal Poly badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Cal Poly SLO  ·  Learn By Doing</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <Text style={styles.prompt}>Choose a photo to get started</Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleTakePhoto} activeOpacity={0.82}>
            <Text style={styles.primaryBtnIcon}>📷</Text>
            <View>
              <Text style={styles.primaryBtnLabel}>Take a Photo</Text>
              <Text style={styles.primaryBtnSub}>Use your camera</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={handlePickFromLibrary} activeOpacity={0.82}>
            <Text style={styles.secondaryBtnIcon}>🖼️</Text>
            <View>
              <Text style={styles.secondaryBtnLabel}>Upload from Library</Text>
              <Text style={styles.secondaryBtnSub}>Choose an existing photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Demo trial */}
        <View style={styles.demoSection}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.demoCard}>
            <Text style={styles.demoTitle}>Not in SLO?</Text>
            <Text style={styles.demoBody}>Try the app on a sample Cal Poly building.</Text>
            <TouchableOpacity style={styles.demoBtn} onPress={handleTrySample} activeOpacity={0.8}>
              <Text style={styles.demoBtnIcon}>🏛️</Text>
              <Text style={styles.demoBtnLabel}>Try Sample Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push('/about')}>
            <Text style={styles.footerLink}>About SLocator</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>·</Text>
          <Text style={styles.footerText}>10 buildings identified</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.green },
  container: {
    flex: 1,
    backgroundColor: Colors.green,
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'android' ? Spacing.xxl : Spacing.lg,
  },

  // ── Header ────────────────────────────────────────────────
  header: { alignItems: 'center', paddingVertical: Spacing.xl },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.darkGreen,
    borderWidth: 3,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  logoEmoji: { fontSize: 54 },

  appName: {
    fontSize: 46,
    fontWeight: Typography.fontWeightExtraBold,
    color: Colors.gold,
    letterSpacing: -1,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: Typography.fontSizeMD,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  badge: {
    backgroundColor: Colors.darkGreen,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gold + '55',
  },
  badgeText: {
    color: Colors.gold,
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightSemiBold,
    letterSpacing: 0.5,
  },

  // ── Actions ───────────────────────────────────────────────
  actions: { gap: Spacing.md, marginTop: Spacing.md },
  prompt: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Typography.fontSizeSM,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },

  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md + 4,
    gap: Spacing.md,
    ...Shadows.md,
  },
  primaryBtnIcon: { fontSize: 32 },
  primaryBtnLabel: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.darkGreen,
  },
  primaryBtnSub: {
    fontSize: Typography.fontSizeSM,
    color: Colors.darkGreen + 'CC',
    marginTop: 2,
  },

  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGreen,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md + 4,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gold + '44',
    ...Shadows.sm,
  },
  secondaryBtnIcon: { fontSize: 32 },
  secondaryBtnLabel: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.white,
  },
  secondaryBtnSub: {
    fontSize: Typography.fontSizeSM,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },

  // ── Demo trial ────────────────────────────────────────────
  demoSection: { marginTop: Spacing.sm },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightSemiBold,
    letterSpacing: 1,
  },
  demoCard: {
    backgroundColor: Colors.darkGreen,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold + '33',
    gap: Spacing.xs,
  },
  demoTitle: {
    fontSize: Typography.fontSizeMD,
    fontWeight: Typography.fontWeightBold,
    color: Colors.white,
  },
  demoBody: {
    fontSize: Typography.fontSizeSM,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gold + '88',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  demoBtnIcon: { fontSize: 18 },
  demoBtnLabel: {
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightSemiBold,
    color: Colors.gold,
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    marginTop: 'auto',
  },
  footerLink: {
    color: Colors.gold,
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightSemiBold,
  },
  footerDot: { color: 'rgba(255,255,255,0.4)', fontSize: Typography.fontSizeSM },
  footerText: { color: 'rgba(255,255,255,0.5)', fontSize: Typography.fontSizeSM },
});
