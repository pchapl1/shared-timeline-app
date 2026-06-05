import { useEffect, useState } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { addMemoryStyles } from '@/styles/addMemoryStyles';
import { locationSearchStyles as styles } from '@/styles/locationSearchStyles';

import type {
  LocationSuggestion,
} from '@/types/location';

import {
  searchLocations,
} from '@/services/location';

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
  const [suggestions, setSuggestions] = useState<
    LocationSuggestion[]
  >([]);

  const [isSearching, setIsSearching] =
    useState(false);

  useEffect(() => {
    const trimmedLocation =
      locationName.trim();

    /**
     * Don't search until the user
     * has entered a few characters.
     */
    if (trimmedLocation.length < 3) {
      setSuggestions([]);
      return;
    }

    /**
     * Debounce typing so we don't
     * call Mapbox on every keystroke.
     */
    const timeoutId = setTimeout(() => {
      handleSearch(trimmedLocation);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [locationName]);

  async function handleSearch(
    query: string
  ) {
    try {
      setIsSearching(true);

      const results =
        await searchLocations(query);

      setSuggestions(results);
    } catch (error) {
      console.log(
        'Location search error:',
        error
      );

      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }

  function handleLocationTextChange(
    text: string
  ) {
    onChangeLocationName(text);

    /**
     * Clear coordinates whenever the
     * user edits the text.
     *
     * Prevents saving coordinates
     * from a previously selected place.
     */
    onChangeLatitude('');
    onChangeLongitude('');
  }

  function handleSelectSuggestion(
    suggestion: LocationSuggestion
  ) {
    /**
     * Save the location name.
     */
    onChangeLocationName(
      suggestion.name
    );

    /**
     * Save coordinates silently.
     * User never sees these fields.
     */
    onChangeLatitude(
      String(suggestion.latitude)
    );

    onChangeLongitude(
      String(suggestion.longitude)
    );

    /**
     * Hide the dropdown after selection.
     */
    setSuggestions([]);
  }

  const hasLocationText =
    locationName.trim().length > 0;

  const hasCoordinates =
    !!latitude && !!longitude;

  return (
    <View>
      <Text style={addMemoryStyles.label}>
        Location
      </Text>

      <TextInput
        value={locationName}
        onChangeText={
          handleLocationTextChange
        }
        placeholder="Search city, place, or destination"
        placeholderTextColor="#8A8A8A"
        style={addMemoryStyles.input}
      />

      {isSearching && (
        <Text style={styles.helperText}>
          Searching locations...
        </Text>
      )}

      {suggestions.length > 0 && (
        <View
          style={
            styles.suggestionsContainer
          }
        >
          {suggestions.map(
            (suggestion) => (
              <TouchableOpacity
                key={suggestion.id}
                style={
                  styles.suggestion
                }
                onPress={() =>
                  handleSelectSuggestion(
                    suggestion
                  )
                }
              >
                <Text
                  style={
                    styles.suggestionText
                  }
                >
                  📍 {suggestion.name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}

      {hasLocationText &&
        !hasCoordinates &&
        !isSearching && (
          <Text
            style={styles.helperText}
          >
            You can save this as typed,
            or choose a suggestion to
            place it on the map.
          </Text>
        )}

      {hasCoordinates && (
        <Text style={styles.helperText}>
          Location selected for map.
        </Text>
      )}
    </View>
  );
}