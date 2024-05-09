import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { usePaymentTransaction } from "../../hooks/auth/price";
import { Button, Stack, Text } from "@chakra-ui/react";
import {
  removeUserCheckoutValue,
  removeUserSingleCartItem,
} from "../../store/localStorage";

const PaymentConfirmationPage = () => {
  const { tx_ref } = useParams();
  const navigate = useNavigate();
  const { paymentTransaction, isPending } = usePaymentTransaction();
  useEffect(() => {
    paymentTransaction({ tx_ref });
  }, [tx_ref]);

  const handleClick = () => {
    removeUserCheckoutValue();
    removeUserSingleCartItem();
    window.location.reload();
    navigate("/all-courses");
  };
  return (
    <Stack height={"100vh"} justify={"center"} align={"center"}> 
      <Text as={"h1"}>Payment Confirmation</Text>
      <Text>{isPending ? "Verifying..." : "Your payment was successful!"}</Text>
      <Button
        mt={3}
        bg={"#A435F0"}
        py={6}
        color={"white"}
        borderRadius={0}
        variant="solid"
        width={"fit-content"}
        onClick={handleClick}
      >
        Back to Courses
      </Button>
    </Stack>
  );
};

export default PaymentConfirmationPage;
