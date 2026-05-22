import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import paystack from "../assets/paystack.png";
import { useCheckoutOrder } from "../hooks/auth/price";

const formatPrice = (amount: number) => `N${amount?.toLocaleString?.() ?? amount}`;

const SingleCheckoutPage = () => {
  const { singleCartCourse } = useSelector((store: RootState) => store?.cart);
  const { order } = useSelector((store: RootState) => store?.user);
  const toast = useToast();
  const [value, setValue] = useState("false");
  const { checkoutOrder } = useCheckoutOrder();

  const handleCheckout = () => {
    if (value === "false") {
      toast({
        title: "Please select a payment method",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    checkoutOrder({ id: order?.id });
  };

  return (
    <Stack pt={{ base: "104px", md: "118px" }} pb={16} px={{ base: 5, md: 12, lg: 16 }} spacing={8}>
      <Box
        borderRadius="32px"
        bgGradient="linear(135deg, #140342 0%, #2d0b8a 55%, #6440fb 100%)"
        color="white"
        px={{ base: 6, md: 10 }}
        py={{ base: 8, md: 10 }}
      >
        <Text textTransform="uppercase" letterSpacing="0.16em" fontWeight={700} fontSize="xs" color="whiteAlpha.700">
          Express Checkout
        </Text>
        <Text mt={3} fontSize={{ base: "30px", md: "44px" }} fontWeight={700} letterSpacing="-0.03em">
          You are one payment away from starting this course.
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "1.2fr 0.8fr" }} gap={8}>
        <GridItem>
          <Stack className="surface-card" borderRadius="28px" p={{ base: 5, md: 7 }} spacing={7}>
            <Stack spacing={2}>
              <Text fontSize="2xl" fontWeight={700} color="#140342">
                Billing address
              </Text>
              <Text color="#4f547b">Nigeria is currently the active billing region for this flow.</Text>
            </Stack>

            <Select variant="filled">
              <option>Nigeria</option>
            </Select>

            <Stack spacing={3}>
              <Flex align="center" justify="space-between">
                <Text fontSize="2xl" fontWeight={700} color="#140342">
                  Payment method
                </Text>
                <Text color="gray.500" fontSize="12px">
                  Secured connection
                </Text>
              </Flex>
              <Box className="surface-card" borderRadius="22px" p={4} bg="rgba(100,64,251,0.03)">
                <RadioGroup onChange={setValue} value={value}>
                  <Radio value="true" colorScheme="purple">
                    <Flex align="center" columnGap={3}>
                      <Image src={paystack} width="110px" />
                      <Text color="#4f547b" fontSize="sm">
                        Pay securely with Paystack
                      </Text>
                    </Flex>
                  </Radio>
                </RadioGroup>
              </Box>
            </Stack>

            <Stack spacing={4}>
              <Text fontSize="2xl" fontWeight={700} color="#140342">
                Order details
              </Text>
              <Flex justify="space-between" align="center" className="surface-card" borderRadius="20px" p={4}>
                <Flex columnGap={3} align="center">
                  <Image
                    boxSize="56px"
                    objectFit="cover"
                    src={singleCartCourse.img}
                    alt={singleCartCourse.title}
                    borderRadius="16px"
                  />
                  <Text fontWeight={700} color="#140342">
                    {singleCartCourse.title}
                  </Text>
                </Flex>
                <Text color="#6440fb" fontWeight={700}>
                  {formatPrice(singleCartCourse.price)}
                </Text>
              </Flex>
            </Stack>
          </Stack>
        </GridItem>

        <GridItem>
          <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 6 }} position={{ xl: "sticky" }} top="120px">
            <Stack spacing={5}>
              <Text fontSize="2xl" fontWeight={700} color="#140342">
                Summary
              </Text>
              <Stack spacing={3}>
                <Flex justify="space-between">
                  <Text color="#4f547b">Original price</Text>
                  <Text color="#140342">{formatPrice(singleCartCourse.price || 0)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#4f547b">Discounts</Text>
                  <Text color="#140342">N0</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between" fontWeight="bold">
                  <Text color="#140342">Total</Text>
                  <Text color="#6440fb" fontSize="2xl">
                    {formatPrice(singleCartCourse.price || 0)}
                  </Text>
                </Flex>
              </Stack>
              <Button
                bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                color="white"
                py={7}
                boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
                onClick={handleCheckout}
                isDisabled={singleCartCourse.price === 0}
              >
                {value === "true" ? "Proceed" : "Complete checkout"}
              </Button>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default SingleCheckoutPage;
