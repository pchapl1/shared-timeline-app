import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { BackButton } from '@/components/ui/BackButton';

import { CreationFooter } from '@/components/creation/CreationFooter';
import { CreationHeader } from '@/components/creation/CreationHeader';
import { CreationProgress } from '@/components/creation/CreationProgress';
import { CreationSuccess } from '@/components/creation/CreationSuccess';

import { CreateTripDestinationStep } from '@/components/trips/create/CreateTripDestinationStep';
import { CreateTripDatesStep } from '@/components/trips/create/CreateTripDatesStep';
import { CreateTripReviewStep } from '@/components/trips/create/CreateTripReviewStep';
import { CreateTripSuccessStep } from '@/components/trips/create/CreateTripSuccessStep';

import { useCreateTrip } from '@/hooks/trips/useCreateTrip';

import { creationFlowStyles as styles } from '@/styles/creation/creationFlowStyles';

const steps = [
  { label: 'Destination' },
  { label: 'Dates' },
  { label: 'Review' },
  { label: 'Created' },
];

type WizardStep = 1 | 2 | 3 | 4;

export default function AddTripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const circleId = Number(id);

  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [createdTripId, setCreatedTripId] = useState<number | null>(
    null
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [destinationName, setDestinationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showStartDatePicker, setShowStartDatePicker] =
    useState(false);
  const [showEndDatePicker, setShowEndDatePicker] =
    useState(false);

  const createTripMutation = useCreateTrip(circleId);

  function goBackStep() {
    if (currentStep === 1) {
      router.back();
      return;
    }

    setCurrentStep((step) => (step - 1) as WizardStep);
  }

  function validateDestinationStep() {
    if (!title.trim()) {
      Alert.alert('Missing trip name', 'Please add a trip name.');
      return false;
    }

    return true;
  }

  function validateDatesStep() {
    if (endDate && endDate < startDate) {
      Alert.alert(
        'Invalid dates',
        'End date cannot be before start date.'
      );
      return false;
    }

    return true;
  }

  function handleNext() {
    if (currentStep === 1 && !validateDestinationStep()) {
      return;
    }

    if (currentStep === 2 && !validateDatesStep()) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((step) => (step + 1) as WizardStep);
    }
  }

  async function handleCreateTrip() {
    if (!validateDestinationStep() || !validateDatesStep()) {
      return;
    }

    try {
      const createdTrip = await createTripMutation.mutateAsync({
        circle: circleId,
        title: title.trim(),
        description,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate
          ? endDate.toISOString().split('T')[0]
          : undefined,
        destination_name: destinationName,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
      });

      setCreatedTripId(createdTrip.id);
      setCurrentStep(4);
    } catch (error: any) {
      console.error(
        'Create trip error:',
        error.response?.data || error
      );

      Alert.alert('Error', 'Could not create trip.');
    }
  }

  function goToTrips() {
    router.replace({
      pathname: '/circles/[id]/trips',
      params: { id },
    });
  }

  function goToTripDetail() {
    if (!createdTripId) {
      goToTrips();
      return;
    }

    router.replace({
      pathname: '/circles/[id]/trips/[tripId]',
      params: {
        id,
        tripId: String(createdTripId),
      },
    });
  }

  return (
    <AppScreen padded={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {currentStep !== 4 && <BackButton onPress={goBackStep} />}

          { currentStep !== 4 && (<CreationHeader title="Create Trip"/>)}
                    
          {currentStep !== 4 && (
            <CreationProgress
              steps={steps}
              currentStep={currentStep}
            />
          )}

          {currentStep === 1 && (
            <>
              <CreationHeader
                title="Where are you going?"
                subtitle="Destination"
              />

              <CreateTripDestinationStep
                title={title}
                description={description}
                destinationName={destinationName}
                latitude={latitude}
                longitude={longitude}
                onTitleChange={setTitle}
                onDescriptionChange={setDescription}
                onDestinationNameChange={setDestinationName}
                onLatitudeChange={setLatitude}
                onLongitudeChange={setLongitude}
              />

              <CreationFooter
                primaryLabel="Continue"
                onPrimaryPress={handleNext}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <CreationHeader
                title="When are you traveling?"
                subtitle="Choose your trip dates."
              />

              <CreateTripDatesStep
                startDate={startDate}
                endDate={endDate}
                showStartDatePicker={showStartDatePicker}
                showEndDatePicker={showEndDatePicker}
                setShowStartDatePicker={setShowStartDatePicker}
                setShowEndDatePicker={setShowEndDatePicker}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />

              <CreationFooter
                secondaryLabel="Back"
                onSecondaryPress={goBackStep}
                primaryLabel="Review"
                onPrimaryPress={handleNext}
              />
            </>
          )}

          {currentStep === 3 && (
          <>
            <CreationHeader title="Ready to create?" />

            <CreateTripReviewStep
              title={title}
              description={description}
              destinationName={destinationName}
              startDate={startDate}
              endDate={endDate}
            />

            <CreationFooter
              secondaryLabel="Back"
              onSecondaryPress={goBackStep}
              primaryLabel="Create Trip"
              onPrimaryPress={handleCreateTrip}
              isLoading={createTripMutation.isPending}
            />
          </>
        )}

          {currentStep === 4 && (
            <CreationSuccess
              title="Trip Created"
              primaryLabel="Go to Trip"
              onPrimaryPress={goToTripDetail}
              secondaryLabel="View All Trips"
              onSecondaryPress={goToTrips}
            >
              <CreateTripSuccessStep tripName={title.trim()} />
            </CreationSuccess>
          )}
        </View>
      </ScrollView>
    </AppScreen>
  );
}