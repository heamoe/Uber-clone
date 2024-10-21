import { View, Text } from "react-native";
import RideLayout from "@/components/RideLayout";

const confirmRide = () => {
  return (
    <RideLayout title="Choose a Driver" style={["65%", "85%"]}>
      <Text>confirmRide</Text>
    </RideLayout>
  );
};

export default confirmRide;
