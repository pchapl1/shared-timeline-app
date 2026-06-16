import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { creationFlowStyles as styles } from '@/styles/creation/creationFlowStyles';

type CreationStep = {
  label: string;
};

type Props = {
  steps: CreationStep[];
  currentStep: number;
};

export function CreationProgress({ steps, currentStep }: Props) {
  return (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;

        return (
          <View key={step.label} style={styles.progressStep}>
            <View
              style={[
                styles.progressDot,
                isActive && styles.progressDotActive,
                isComplete && styles.progressDotComplete,
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
              style={styles.progressLabel}
            >
              {step.label}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}