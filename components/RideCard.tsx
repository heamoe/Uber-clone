import { Ride } from "@/types/type";
import { View, Text, Image } from "react-native";
import { icons } from "@/constants";

const RideCard = ({
  ride: {
    destination_latitude,
    destination_longitude,
    destination_address,
    driver,
    orrign_address,
    created_at,
    ride_time,
    payment_status,
  },
}: {
  ride: Ride;
}) => (
  <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
    <View className="flex flex-row items-center justify-center p-3">
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-lg"
        />
        <View className="flex flex-col mx-5 gap-y-5 flex-1">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.to} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium">
              {destination_address}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-3xl">{driver.first_name}</Text>
    </View>
  </View>
);

export default RideCard;
