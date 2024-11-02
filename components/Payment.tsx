import CustomButton from "@/components/CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { View, Button, Alert } from "react-native";

const Payment = () => {
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
      if (error.code === PaymentSheetError.Canceled) {
        Alert.alert(`Error Code:  ${error.code}`, error.message);
      } else {
        // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, etc.
      }
    } else {
      // Payment completed - show a confirmation screen.
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
