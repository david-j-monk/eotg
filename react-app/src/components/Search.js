/* eslint-disable no-console */
import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxPopover,
  ComboboxList,
  ComboboxInput,
  ComboboxOption,
} from '@reach/combobox';

export function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 54.029578, lng: () => -4.153496 },
      radius: 600 * 1000,
    },
  });

  return (
    <div>
      <Combobox
        onSelect={async (address) => {
          setValue('');
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng }, 14);
          } catch (error) {
            console.log('error: ', error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Go to..."
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
               
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
export default Search;
