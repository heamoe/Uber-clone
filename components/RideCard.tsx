import { Ride } from "@/types/type";
import { View, Text } from "react-native";

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
  <View>
    <Text>{driver.first_name}</Text>
  </View>
);
export default RideCard;
