import CustomButton from "@/components/CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { View, Button, Alert } from "react-native";
import { useState } from "react";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

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

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error Code:  ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
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
