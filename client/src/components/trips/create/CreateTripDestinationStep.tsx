import { TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { LocationSearch } from '@/components/search/LocationSearch';

import { colors } from '@/theme/colors';
import { createTripStyles as styles } from '@/styles/trips/createTripStyles';

type Props = {
  title: string;
  description: string;
  destinationName: string;
  latitude: string;
  longitude: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDestinationNameChange: (value: string) => void;
  onLatitudeChange: (value: string) => void;
  onLongitudeChange: (value: string) => void;
};

export function CreateTripDestinationStep({
  title,
  description,
  destinationName,
  latitude,
  longitude,
  onTitleChange,
  onDescriptionChange,
  onDestinationNameChange,
  onLatitudeChange,
  onLongitudeChange,
}: Props) {
  return (
    <>
      <View style={styles.field}>
        <AppText variant="caption" style={styles.label}>
          Trip Name
        </AppText>

        <TextInput
          style={styles.input}
          value={title}
          onChangeText={onTitleChange}
          placeholder="London 2027"
          placeholderTextColor={colors.textSubtle}
        />
      </View>

       <LocationSearch
        locationName={destinationName}
        latitude={latitude}
        longitude={longitude}
        onChangeLocationName={onDestinationNameChange}
        onChangeLatitude={onLatitudeChange}
        onChangeLongitude={onLongitudeChange}
        containerStyle={styles.field}
        inputStyle={styles.input}
        labelStyle={styles.label}
      />

      <View style={styles.field}>
        <AppText variant="caption" style={styles.label}>
          Description
        </AppText>

        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={onDescriptionChange}
          multiline
          placeholder="Tell the story of this trip..."
          placeholderTextColor={colors.textSubtle}
        />
      </View>

     
    </>
  );
}