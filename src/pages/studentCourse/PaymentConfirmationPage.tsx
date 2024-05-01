import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePaymentTransaction } from "../../hooks/auth/price";
import { Button, Stack, Text } from "@chakra-ui/react";

const PaymentConfirmationPage = () => {
  const { tx_ref } = useParams();
  const { paymentTransaction, isPending } = usePaymentTransaction();
  useEffect(() => {
    paymentTransaction({ tx_ref });
  }, [tx_ref]);
  return (
    <Stack>
      <Text as={"h1"}>Payment Confirmation</Text>

      <Text>{isPending ? "Verifying..." : "Your payment was successful!"}</Text>
      <Button
        mt={3}
        bg={"#A435F0"}
        py={7}
        color={"white"}
        borderRadius={0}
        variant="solid"
        width={"fit-content"}
        as={Link}
        to={"/all-courses"}
      >
        Back to Courses
      </Button>
    </Stack>
  );
};

export default PaymentConfirmationPage;
