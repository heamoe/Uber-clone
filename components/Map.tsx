import { Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "@/store";

const Map = () => {
  const { userLongitude, userLatitude, desiredLongitude, desiredLatitude } =
    useLocationStore;

  const region = calculateRegion({
    latitude: userLatitude,
    longitude: userLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showPointsOfInterest={false}
      //initialRegion={{}}
      showsUserLocation={true}
      userInteraction="light"
    >
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
