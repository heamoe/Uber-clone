import CustomButton from "@/components/CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { View, Button } from "react-native";
import { useEffect, useState } from "react";
const Payment = () => {
  const [publishableKey, setPublishableKey] = useState("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const confirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback,
  ) => {
    // explained later

    const didTapCheckoutButton = async () => {
      // implement later
    };
    return (
      <View>
        <Button title="Checkout" onPress={didTapCheckoutButton} />
      </View>
    );
  };

  const fetchPublishableKey = async () => {
    //const key = await fetchKey(); // fetch key from your server here
    //setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);
  const openPaymentSheet = async () => {
    // open payment sheet
  };
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
