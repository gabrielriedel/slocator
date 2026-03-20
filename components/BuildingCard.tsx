import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Building } from '../data/buildings';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

interface BuildingCardProps {
  building: Building;
  confidence: number;
}

export default function BuildingCard({ building, confidence }: BuildingCardProps) {
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  const confidencePercent = Math.round(confidence * 100);
  const confidenceColor =
    confidence >= 0.85 ? Colors.success : confidence >= 0.65 ? Colors.gold : Colors.error;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Building name + confidence */}
      <View style={styles.headerRow}>
        <Text style={styles.buildingName}>{building.name}</Text>
        <View style={[styles.confidenceBadge, { backgroundColor: confidenceColor }]}>
          <Text style={styles.confidenceText}>{confidencePercent}%</Text>
        </View>
      </View>

      <Text style={styles.description}>{building.description}</Text>

      {/* Info rows */}
      <View style={styles.infoCard}>
        <InfoRow icon="🏢" label="Building #" value={building.number} />
        <Divider />
        <InfoRow icon="📍" label="Location" value={building.location} />
        <Divider />
        <InfoRow icon="🎓" label="Department" value={building.department} />
        {building.yearBuilt && (
          <>
            <Divider />
            <InfoRow icon="📅" label="Year Built" value={String(building.yearBuilt)} />
          </>
        )}
      </View>

      {/* Fun facts */}
      <Text style={styles.sectionTitle}>🐴  Fun Facts</Text>
      {building.funFacts.map((fact, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.factCard}
          onPress={() => setExpandedFact(expandedFact === idx ? null : idx)}
          activeOpacity={0.8}
        >
          <View style={styles.factHeader}>
            <View style={styles.factNumber}>
              <Text style={styles.factNumberText}>{idx + 1}</Text>
            </View>
            <Text style={styles.factText} numberOfLines={expandedFact === idx ? undefined : 2}>
              {fact}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Learn more */}
      {building.learnMoreUrl && (
        <TouchableOpacity
          style={styles.learnMoreBtn}
          onPress={() => Linking.openURL(building.learnMoreUrl!)}
        >
          <Text style={styles.learnMoreText}>🔗  Learn More About This Building</Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomPad} />
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  content: { padding: Spacing.md },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  buildingName: {
    flex: 1,
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightExtraBold,
    color: Colors.green,
    lineHeight: 32,
  },
  confidenceBadge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginTop: 4,
  },
  confidenceText: {
    color: Colors.white,
    fontSize: Typography.fontSizeSM,
    fontWeight: Typography.fontWeightBold,
  },

  description: {
    fontSize: Typography.fontSizeMD,
    color: Colors.darkGray,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },

  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  infoIcon: { fontSize: 20, marginRight: Spacing.sm, marginTop: 2 },
  infoContent: { flex: 1 },
  infoLabel: {
    fontSize: Typography.fontSizeXS,
    color: Colors.midGray,
    fontWeight: Typography.fontWeightSemiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: Typography.fontSizeMD,
    color: Colors.black,
    fontWeight: Typography.fontWeightMedium,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginLeft: 32,
  },

  sectionTitle: {
    fontSize: Typography.fontSizeLG,
    fontWeight: Typography.fontWeightBold,
    color: Colors.green,
    marginBottom: Spacing.sm,
  },

  factCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
    ...Shadows.sm,
  },
  factHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  factNumber: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  factNumberText: {
    color: Colors.darkGreen,
    fontSize: Typography.fontSizeXS,
    fontWeight: Typography.fontWeightBold,
  },
  factText: {
    flex: 1,
    fontSize: Typography.fontSizeMD,
    color: Colors.darkGray,
    lineHeight: 22,
  },

  learnMoreBtn: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.green,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  learnMoreText: {
    color: Colors.white,
    fontWeight: Typography.fontWeightSemiBold,
    fontSize: Typography.fontSizeMD,
  },

  bottomPad: { height: Spacing.xl },
});
