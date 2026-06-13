import { useState } from 'react';

import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { BackButton } from '@/components/ui/BackButton';

import { api } from '@/services/api';

import { colors } from '@/theme/colors';
import { createCircleStyles as styles } from '@/styles/createCircleStyles';

const circleTypeOptions = [
  { label: 'Couple', value: 'couple' },
  { label: 'Friends', value: 'friends' },
  { label: 'Family', value: 'family' },
  { label: 'Travel Group', value: 'travel_group' },
];

export default function CreateCircleScreen() {
  const [name, setName] = useState('');
  const [circleType, setCircleType] = useState('friends');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCircleTypeLabel =
    circleTypeOptions.find((option) => option.value === circleType)
      ?.label ?? 'Friends';

  function openCircleTypePicker() {
    Alert.alert('Select Circle Type', '', [
      { text: 'Couple', onPress: () => setCircleType('couple') },
      { text: 'Friends', onPress: () => setCircleType('friends') },
      { text: 'Family', onPress: () => setCircleType('family') },
      {
        text: 'Travel Group',
        onPress: () => setCircleType('travel_group'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  async function handleCreateCircle() {
  const trimmedName = name.trim();

  if (!trimmedName) {
    Alert.alert('Missing name', 'Please add a circle name.');
    return;
  }

  try {
    setIsSubmitting(true);

    const response = await api.post('/circles/', {
      name: trimmedName,
      circle_type: circleType,
      start_date: startDate.toISOString().split('T')[0],
    });

    router.replace({
      pathname: '/circles/[id]/invite',
      params: {
        id: response.data.id.toString(),
      },
    });
  } catch (error: any) {
    console.error(
      'Create circle error:',
      error.response?.data || error
    );

    Alert.alert('Error', 'Could not create circle.');
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <AppScreen padded={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <BackButton
            onPress={() => router.back()}
          />
          <View style={styles.heroIcon}>
            <AppText style={styles.heroEmoji}>✨</AppText>
          </View>

          <View style={styles.header}>
            <AppText variant="h1" style={styles.title}>
              Start a new Circle
            </AppText>

            <AppText
              variant="body"
              color={colors.textMuted}
              style={styles.subtitle}
            >
              A circle is your shared space for memories, trips,
              milestones, and the people who matter.
            </AppText>
          </View>

          <AppCard style={styles.card}>
            <AppText variant="caption" color={colors.textMuted}>
              Circle Name
            </AppText>

            <TextInput
              style={styles.input}
              placeholder="Summer crew"
              placeholderTextColor={colors.textSubtle}
              value={name}
              onChangeText={setName}
            />

            <AppText variant="caption" color={colors.textMuted}>
              Circle Type
            </AppText>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={openCircleTypePicker}
              activeOpacity={0.85}
            >
              <AppText variant="body" color={colors.text}>
                {selectedCircleTypeLabel}
              </AppText>

              <AppText variant="bodySmall" color={colors.textMuted}>
                ▼
              </AppText>
            </TouchableOpacity>

            <View style={styles.fieldSpacer}>
              <AppText variant="caption" color={colors.textMuted}>
                Start Date
              </AppText>
            </View>

            {Platform.OS === 'web' ? (
              <TextInput
                style={styles.input}
                value={startDate.toISOString().split('T')[0]}
                onChangeText={(text) => {
                  const parsedDate = new Date(text);

                  if (!Number.isNaN(parsedDate.getTime())) {
                    setStartDate(parsedDate);
                  }
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textSubtle}
              />
            ) : (
              <>
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <AppText variant="body" color={colors.text}>
                    {startDate.toDateString()}
                  </AppText>
                </Pressable>

                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowStartDatePicker(false);

                      if (selectedDate) {
                        setStartDate(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          </AppCard>

          <TouchableOpacity
            style={[
              styles.button,
              isSubmitting && styles.buttonDisabled,
            ]}
            onPress={handleCreateCircle}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <AppText variant="bodyStrong" color={colors.textInverse}>
              {isSubmitting ? 'Creating Circle...' : 'Create Circle'}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreen>
  );
}