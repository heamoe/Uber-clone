import { View, Text, FlatList } from "react-native";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const confirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  //console.log("driver:", drivers[0].driver_id);
  return (
    <RideLayout title="Choose a Driver" style={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            Selected={selectedDriver!}
            setSelected={() => {
              console.log("Selected Driver ID:", item.driver_id);
              setSelectedDriver(item.driver_id);
            }}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mt-10 mx-5">
            <CustomButton
              title="Select Driver"
              onPress={() => router.push("/(root)/book-ride")}
            >
              Confirm Ride
            </CustomButton>
          </View>
        )}
      />
    </RideLayout>
  );
};
export default confirmRide;
