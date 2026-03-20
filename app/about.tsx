import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🐴</Text>
          <Text style={styles.heroTitle}>SLocator</Text>
          <Text style={styles.heroSub}>Cal Poly Building Identifier</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is SLocator?</Text>
          <Text style={styles.body}>
            SLocator uses a custom-trained machine learning model to identify Cal Poly SLO campus buildings from photos.
            Point your camera at any building on campus and get instant information about it — history, department, fun facts, and more.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          {[
            ['📷', 'Take or upload a photo of a campus building'],
            ['🧠', 'A vision model analyzes the image'],
            ['🏛️', 'The building is identified with a confidence score'],
            ['📖', 'Fun facts and info are displayed instantly'],
          ].map(([icon, text], i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepIcon}>
                <Text style={{ fontSize: 20 }}>{icon}</Text>
              </View>
              <Text style={styles.stepText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built at Cal Poly</Text>
          <Text style={styles.body}>
            SLocator was built by Cal Poly students as part of a computer vision and mobile development project.
            The dataset, model, and app were created entirely by Mustangs, for Mustangs.
          </Text>
          <Text style={[styles.body, { marginTop: Spacing.sm }]}>
            <Text style={{ fontWeight: Typography.fontWeightBold }}>Learn By Doing</Text> — that's the Cal Poly way. 🌿
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Cal Poly San Luis Obispo  ·  2026</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.calpoly.edu')}>
            <Text style={styles.footerLink}>calpoly.edu</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.offWhite },
  container: { padding: Spacing.lg, gap: Spacing.xl },

  hero: { alignItems: 'center', paddingVertical: Spacing.xl },
  heroEmoji: { fontSize: 64, marginBottom: Spacing.sm },
  heroTitle: {
    fontSize: Typography.fontSizeXXL,
    fontWeight: Typography.fontWeightExtraBold,
    color: Colors.green,
    letterSpacing: -1,
  },
  heroSub: {
    fontSize: Typography.fontSizeMD,
    color: Colors.midGray,
    marginTop: Spacing.xs,
  },

  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.green,
    marginBottom: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
    paddingBottom: Spacing.sm,
  },
  body: {
    fontSize: Typography.fontSizeMD,
    color: Colors.darkGray,
    lineHeight: 24,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.green + '15',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    fontSize: Typography.fontSizeMD,
    color: Colors.darkGray,
    lineHeight: 22,
  },

  footer: { alignItems: 'center', paddingBottom: Spacing.xl, gap: Spacing.xs },
  footerText: { color: Colors.midGray, fontSize: Typography.fontSizeSM },
  footerLink: {
    color: Colors.green,
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightSemiBold,
    textDecorationLine: 'underline',
  },
});
