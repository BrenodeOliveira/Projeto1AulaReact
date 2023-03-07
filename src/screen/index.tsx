import React, {useEffect, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Image} from 'react-native';
import {styles} from './styles'
import {coords} from './coord'

const GOOGLE_MAPS_APIKEY = 'AIzaSyD6X1zKZfMpfE4OwqO7qzjWrdCR3NPqmQB';
const initialCoord = {
  latitude: -23.6929523,
    longitude: -46.4531782,
    title: 'Casa',
    description: 'Você está aqui',
}

export default function Maps() {
  const mapRef = useRef<MapView>(null);

  function fitPadding() {
    mapRef.current?.fitToCoordinates([coords[0], coords[1]], {
      edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
      animated: true,
    });
  }

  useEffect(() => {
    fitPadding();
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -23.6929523,
        longitude: -46.4531782,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {coords.map((coord, index) => (
        <Marker
          key={index}
          coordinate={{latitude: coord.latitude, longitude: coord.longitude}}
          title={coord.title}
          description={coord.description}>
          <Image
            source={{
              uri: 'https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png',
            }}
            style={{height: 50, width: 50}}
          />
        </Marker>
      ))}
      <Marker
      coordinate={{latitude: initialCoord.latitude, longitude: initialCoord.longitude}}
      title={initialCoord.title}
      description={initialCoord.description} >
        <Image
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20211109/ourmid/pngtree-map-red-pointer-icon-location-destination-point-design-3d-png-image_4026952.png',
            }}
            style={{height: 50, width: 50}}
          />
      </Marker>
      <MapViewDirections
        origin={{latitude: initialCoord.latitude, longitude: initialCoord.longitude}}
        destination={{latitude: coords[0].latitude, longitude: coords[0].longitude}}
        apikey={GOOGLE_MAPS_APIKEY}
      />
    </MapView>
  );
}
