import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef } from "react";

const Onborading = () => {
  const swiperRef = useRef<Swiper>(null);
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex items-end justify-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper ref={swiperRef} loop={false}></Swiper> dot =
      {<view className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]" />}
    </SafeAreaView>
  );
};

export default Onborading;
