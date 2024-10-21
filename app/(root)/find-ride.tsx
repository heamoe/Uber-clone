import { View, Text } from "react-native";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();
  return (
    <RideLayout title="FindRide" snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">from</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#F5F5F5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">to</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <CustomButton
        title="Find Ride"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
