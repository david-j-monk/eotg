import React from 'react';

export default function Locate({ panTo }) {
  const locateOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return (
    <button
      className="locate"
      type="button"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo(
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              18,
            );
          },
          (e) => {
            console.log(`ERROR(${e.code}): ${e.message}`);
          },
          locateOptions,
        );
      }}
    >
      <img src="/images/locateMe.svg" alt="compass - locate me" />
    </button>
  );
}
