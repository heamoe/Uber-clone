import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { icons } from "@/constants";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { useFetch } from "@/lib/fetch";
import { ActivityIndicator, Text, View } from "react-native";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  /*  useEffect(() => {
            console.log("User Latitude:", userLatitude);
            console.log("User Longitude:", userLongitude);
          }, [userLatitude, userLongitude]);*/

  const { selectedDriver, setDrivers } = useDriverStore();
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  //console.log("drivers are :", drivers);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      //console.log("newMarkers", newMarkers);
      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length > 0 && destinationLongitude && destinationLatitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex justify-between items-center w-full">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInteraction="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.driver_id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.driver_id
              ? icons.selectedMarker
              : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
