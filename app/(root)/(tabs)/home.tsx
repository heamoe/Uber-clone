import { SignedIn, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, Text } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView className="bg-general-500 ">
      <SignedIn>
        <Text>Hello！ {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
    </SafeAreaView>
  );
}
