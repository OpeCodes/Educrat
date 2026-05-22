import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePaymentTransaction } from "../../hooks/auth/price";
import { Box, Button, Spinner, Stack, Text } from "@chakra-ui/react";
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
    navigate("/all-courses");
    window.location.reload();
  };

  return (
    <Stack minH="100vh" justify="center" align="center" px={5}>
      <Box
        className="surface-card"
        borderRadius="32px"
        p={{ base: 6, md: 10 }}
        maxW="640px"
        w="full"
        textAlign="center"
      >
        <Stack spacing={5} align="center">
          <Text
            textTransform="uppercase"
            letterSpacing="0.16em"
            fontWeight={700}
            fontSize="xs"
            color="#6440fb"
          >
            Payment Confirmation
          </Text>
          {isPending ? (
            <Spinner
              thickness="4px"
              speed="0.7s"
              emptyColor="rgba(100,64,251,0.15)"
              color="#6440fb"
              boxSize={"56px"}
            />
          ) : (
            <Box
              w="76px"
              h="76px"
              borderRadius="full"
              bg="rgba(16,185,129,0.12)"
              color="#10b981"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2rem"
              fontWeight={700}
            >
              OK
            </Box>
          )}
          <Text fontSize={{ base: "2rem", md: "2.6rem" }} fontWeight={700} color="#140342" lineHeight={1.05}>
            {isPending ? "Verifying your payment" : "Your payment was successful"}
          </Text>
          <Text color="#4f547b" maxW="460px">
            {isPending
              ? "This usually takes just a moment while we confirm your transaction."
              : "Your enrollment is confirmed. Head back to the catalog and keep learning."}
          </Text>
          {!isPending && (
            <Button
              mt={2}
              bgGradient="linear(to-r, #6440fb, #8b5cf6)"
              py={6}
              color={"white"}
              variant="solid"
              width={"fit-content"}
              px={7}
              onClick={handleClick}
              boxShadow="0 16px 32px rgba(100,64,251,0.24)"
              _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
            >
              Back to courses
            </Button>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default PaymentConfirmationPage;
