import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const Map = () => {
  const containerStyle = {
    height: '1000px',
    width: '100%',
  };

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  // Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);

  // set response language. Defaults to english.
  // Geocode.setLanguage('en');

  // Geocode.setRegion('en');

  // Enable or disable logs. Its optional.
  // Geocode.enableDebug();

  // Get latitude & longitude from address.
  // useEffect(() => {
  // location &&
  // Geocode.fromAddress(location).then(
  //   (response: any) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     setLatLng({ lat, lng });
  //   },
  //   () => {
  //     setNoLocation(true);
  //   }
  // );
  // }, [location]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={11}
      center={{
        lat: 42.499958,
        lng: -70.857802,
      }}
      options={{
        disableDefaultUI: true,
        keyboardShortcuts: false,
        draggable: false,
      }}
    >
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.499958,
            lng: -70.857802,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.469818,
            lng: -70.919327,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.5279,
            lng: -70.9287,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.5584,
            lng: -70.88,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.5195,
            lng: -70.8967,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.4668,
            lng: -70.9495,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.4266,
            lng: -70.9223,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
      <Marker
        position={
          new window.google.maps.LatLng({
            lat: 42.5387,
            lng: -71.0466,
          })
        }
        animation={window.google.maps.Animation.DROP}
      />
    </GoogleMap>
  ) : (
    <div>Loading ...</div>
  );
};

export default Map;
