import CustomButton from "@/components/CustomButton";

const Payment = () => {
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
