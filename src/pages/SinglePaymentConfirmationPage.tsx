import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Stack, Text } from "@chakra-ui/react";
import { usePaymentSingleTransaction } from "../hooks/auth/price";

const SinglePaymentConfirmationPage = () => {
  const { tx_ref } = useParams();
  const { paymentTransaction, isPending } = usePaymentSingleTransaction();
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

export default SinglePaymentConfirmationPage;


 