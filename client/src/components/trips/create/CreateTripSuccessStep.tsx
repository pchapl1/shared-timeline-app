import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';

type Props = {
  tripName: string;
};

export function CreateTripSuccessStep({ tripName }: Props) {
  return (
    <AppText
      variant="body"
      color={colors.textMuted}
      style={{ textAlign: 'center' }}
    >
      {tripName} is ready.
    </AppText>
  );
}