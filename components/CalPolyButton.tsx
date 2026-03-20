import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

interface CalPolyButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CalPolyButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}: CalPolyButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.78}
      style={[
        styles.base,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.white : Colors.green}
        />
      ) : (
        <Text
          style={[
            styles.label,
            styles[`labelSize_${size}`],
            styles[`labelVariant_${variant}`],
            textStyle,
          ]}
        >
          {icon ? `${icon}  ${label}` : label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },

  // Sizes
  size_sm: { paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.md },
  size_md: { paddingVertical: Spacing.sm + 4, paddingHorizontal: Spacing.lg },
  size_lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },

  // Variants
  variant_primary: { backgroundColor: Colors.gold },
  variant_secondary: { backgroundColor: Colors.green },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.green,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
    ...{ shadowOpacity: 0 },
    elevation: 0,
  },

  disabled: { opacity: 0.45 },

  // Labels
  label: {
    fontWeight: Typography.fontWeightBold,
    letterSpacing: 0.3,
  },
  labelSize_sm: { fontSize: Typography.fontSizeSM },
  labelSize_md: { fontSize: Typography.fontSizeMD },
  labelSize_lg: { fontSize: Typography.fontSizeLG },

  labelVariant_primary: { color: Colors.darkGreen },
  labelVariant_secondary: { color: Colors.white },
  labelVariant_outline: { color: Colors.green },
  labelVariant_ghost: { color: Colors.green },
});
