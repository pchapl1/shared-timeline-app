import { Platform, Pressable, TextInput, View } from 'react-native';

import { AppDatePickerModal } from '@/components/ui/AppDatePickerModal';
import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { createTripStyles as styles } from '@/styles/trips/createTripStyles';

type Props = {
  startDate: Date;
  endDate: Date | null;
  showStartDatePicker: boolean;
  showEndDatePicker: boolean;
  setShowStartDatePicker: (value: boolean) => void;
  setShowEndDatePicker: (value: boolean) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
};

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function CreateTripDatesStep({
  startDate,
  endDate,
  showStartDatePicker,
  showEndDatePicker,
  setShowStartDatePicker,
  setShowEndDatePicker,
  setStartDate,
  setEndDate,
}: Props) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.field}>
        <AppText variant="caption" style={styles.label}>
          Start Date
        </AppText>

        {Platform.OS === 'web' ? (
          <TextInput
            style={styles.input}
            value={startDate.toISOString().split('T')[0]}
            onChangeText={(text) => {
              const parsed = new Date(text);

              if (!Number.isNaN(parsed.getTime())) {
                setStartDate(parsed);
              }
            }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textSubtle}
          />
        ) : (
          <>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <AppText>{formatDate(startDate)}</AppText>
            </Pressable>

            <AppDatePickerModal
              isVisible={showStartDatePicker}
              value={startDate}
              onCancel={() => setShowStartDatePicker(false)}
              onConfirm={(date) => {
                setStartDate(date);
                setShowStartDatePicker(false);
              }}
            />
          </>
        )}
      </View>

      <View style={styles.field}>
        <AppText variant="caption" style={styles.label}>
          End Date
        </AppText>

        {Platform.OS === 'web' ? (
          <TextInput
            style={styles.input}
            value={
              endDate
                ? endDate.toISOString().split('T')[0]
                : ''
            }
            onChangeText={(text) => {
              if (!text.trim()) {
                setEndDate(null);
                return;
              }

              const parsed = new Date(text);

              if (!Number.isNaN(parsed.getTime())) {
                setEndDate(parsed);
              }
            }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textSubtle}
          />
        ) : (
          <>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <AppText color={endDate ? colors.text : colors.textSubtle}>
                {endDate ? formatDate(endDate) : 'Select end date'}
              </AppText>
            </Pressable>

            <AppDatePickerModal
              isVisible={showEndDatePicker}
              value={endDate ?? startDate}
              minimumDate={startDate}
              onCancel={() => setShowEndDatePicker(false)}
              onConfirm={(date) => {
                setEndDate(date);
                setShowEndDatePicker(false);
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}