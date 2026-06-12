import { useEffect, useState } from 'react';

import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { addMemoryStyles } from '@/styles/addMemoryStyles';
import { locationSearchStyles as styles } from '@/styles/locationSearchStyles';

import { colors } from '@/theme/colors';

import type { LocationSuggestion } from '@/types/location';

import { searchLocations } from '@/services/location';

type Props = {
  locationName: string;
  latitude: string;
  longitude: string;
  onChangeLocationName: (value: string) => void;
  onChangeLatitude: (value: string) => void;
  onChangeLongitude: (value: string) => void;
};

export function LocationSearch({
  locationName,
  latitude,
  longitude,
  onChangeLocationName,
  onChangeLatitude,
  onChangeLongitude,
}: Props) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmedLocation = locationName.trim();

    if (trimmedLocation.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearch(trimmedLocation);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [locationName]);

  async function handleSearch(query: string) {
    try {
      setIsSearching(true);

      const results = await searchLocations(query);

      setSuggestions(results);
    } catch (error) {
      console.log('Location search error:', error);

      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }

  function handleLocationTextChange(text: string) {
    onChangeLocationName(text);
    onChangeLatitude('');
    onChangeLongitude('');
  }

  function handleSelectSuggestion(suggestion: LocationSuggestion) {
    onChangeLocationName(suggestion.name);
    onChangeLatitude(String(suggestion.latitude));
    onChangeLongitude(String(suggestion.longitude));
    setSuggestions([]);
  }

  const hasLocationText = locationName.trim().length > 0;
  const hasCoordinates = !!latitude && !!longitude;

  return (
    <View>
      <AppText variant="caption" color={colors.textMuted}>
        Location
      </AppText>

      <TextInput
        value={locationName}
        onChangeText={handleLocationTextChange}
        placeholder="Search city, place, or destination"
        placeholderTextColor={colors.textSubtle}
        style={addMemoryStyles.input}
      />

      {isSearching && (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.helperText}
        >
          Searching locations...
        </AppText>
      )}

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={styles.suggestion}
              onPress={() => handleSelectSuggestion(suggestion)}
            >
              <AppText variant="bodySmall" style={styles.suggestionText}>
                📍 {suggestion.name}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {hasLocationText && !hasCoordinates && !isSearching && (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.helperText}
        >
          You can save this as typed, or choose a suggestion to place it on the map.
        </AppText>
      )}

      {hasCoordinates && (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.helperText}
        >
          Location selected for map.
        </AppText>
      )}
    </View>
  );
}