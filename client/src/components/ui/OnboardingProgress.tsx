import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { onboardingProgressStyles as styles } from '@/styles/onboardingProgressStyles';

type Step = {
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
};

export function OnboardingProgress({ steps, currentStep }: Props) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <View key={step.label} style={styles.step}>
            <View
              style={[
                styles.dot,
                isActive && styles.dotActive,
                isComplete && styles.dotComplete,
              ]}
            >
              <AppText
                variant="caption"
                color={
                  isActive || isComplete
                    ? colors.textInverse
                    : colors.textMuted
                }
              >
                {isComplete ? '✓' : stepNumber}
              </AppText>
            </View>

            <AppText
              variant="caption"
              color={isActive ? colors.primary : colors.textMuted}
              style={styles.label}
            >
              {step.label}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}