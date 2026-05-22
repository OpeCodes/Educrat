import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { removeCourseFromCart, setToggleCheckout } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";
import { useCreateOrder } from "../hooks/auth/price";
import { addUserCheckoutValue } from "../store/localStorage";

const formatPrice = (amount: number) => `N${amount?.toLocaleString?.() ?? amount}`;

const Cart = () => {
  const { courses } = useSelector((store: RootState) => store?.cart);
  const { user } = useSelector((store: RootState) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const totalPrice = courses?.reduce((acc: any, course: any) => acc + course?.price, 0);

  const handleRemoveFromCart = (courseId: string) => {
    dispatch(removeCourseFromCart(courseId));
  };

  const { createOrder } = useCreateOrder();
  const idStrings = courses?.map((obj: any) => obj?.id);

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Sign in to proceed to checkout",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    createOrder({
      body: {
        totalAmount: totalPrice,
        courses: idStrings,
      },
    });
    dispatch(setToggleCheckout(true));
    addUserCheckoutValue(true);
    navigate("/payment/checkout");
  };

  return (
    <Stack pt={{ base: "104px", md: "118px" }} pb={16} px={{ base: 5, md: 12, lg: 16 }} spacing={8}>
      <Box
        borderRadius="32px"
        bgGradient="linear(135deg, #140342 0%, #2d0b8a 55%, #6440fb 100%)"
        color="white"
        px={{ base: 6, md: 10 }}
        py={{ base: 8, md: 10 }}
        boxShadow="0 24px 60px rgba(20,3,66,0.16)"
      >
        <Text textTransform="uppercase" letterSpacing="0.16em" fontWeight={700} fontSize="xs" color="whiteAlpha.700">
          Cart
        </Text>
        <Text mt={3} fontSize={{ base: "30px", md: "44px" }} fontWeight={700} letterSpacing="-0.03em">
          Your next skill upgrade is waiting.
        </Text>
        <Text mt={3} color="whiteAlpha.800" maxW="620px">
          Review your selected courses, trim what you do not need, and head to checkout when you are ready.
        </Text>
      </Box>

      <Flex direction={{ base: "column", xl: "row" }} gap={8} align="start">
        <Stack flex="1" spacing={5} w="full">
          {courses?.length === 0 ? (
            <Box className="surface-card" borderRadius="28px" p={8}>
              <Text fontSize="xl" fontWeight={700} color="#140342">
                Your cart is empty
              </Text>
              <Text mt={2} color="#4f547b">
                Add a course from the catalog to start building your learning plan.
              </Text>
            </Box>
          ) : (
            courses?.map((course: any) => (
              <Flex
                key={course?.id}
                className="surface-card"
                borderRadius="24px"
                p={{ base: 4, md: 5 }}
                gap={4}
                justify="space-between"
                align={{ base: "start", md: "center" }}
                direction={{ base: "column", md: "row" }}
              >
                <Flex gap={4} align="center" flex="1">
                  <Image
                    borderRadius="18px"
                    boxSize={{ base: "72px", md: "90px" }}
                    objectFit="cover"
                    src={course?.img}
                    alt={course?.title}
                  />
                  <Stack spacing={1}>
                    <Text fontWeight={700} color="#140342" fontSize={{ base: "md", md: "lg" }}>
                      {course?.title}
                    </Text>
                    <Text color="#4f547b" fontSize="sm">
                      Ready for checkout
                    </Text>
                  </Stack>
                </Flex>

                <Flex align="center" gap={{ base: 4, md: 8 }} w={{ base: "full", md: "auto" }} justify="space-between">
                  <Box>
                    <Text color="#4f547b" fontSize="xs" textTransform="uppercase" letterSpacing="0.12em">
                      Price
                    </Text>
                    <Text fontWeight={700} color="#6440fb" fontSize="lg">
                      {formatPrice(course?.price)}
                    </Text>
                  </Box>
                  <Button
                    onClick={() => handleRemoveFromCart(course?.id)}
                    leftIcon={<MdClose />}
                    variant="ghost"
                    color="#140342"
                    _hover={{ bg: "#fff1f2", color: "#dc2626" }}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))
          )}
        </Stack>

        <Stack className="surface-card" borderRadius="28px" p={6} w={{ base: "full", xl: "380px" }} spacing={5} position={{ xl: "sticky" }} top="120px">
          <Text fontSize="2xl" fontWeight={700} color="#140342">
            Order summary
          </Text>
          <Stack spacing={4}>
            <Flex justify="space-between">
              <Text color="#4f547b">Courses</Text>
              <Text color="#140342" fontWeight={600}>
                {courses?.length || 0}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text color="#4f547b">Subtotal</Text>
              <Text color="#140342" fontWeight={600}>
                {formatPrice(totalPrice || 0)}
              </Text>
            </Flex>
            <Divider />
            <Flex justify="space-between">
              <Text color="#140342" fontWeight={700}>
                Total
              </Text>
              <Text color="#6440fb" fontWeight={700} fontSize="2xl">
                {formatPrice(totalPrice || 0)}
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
            isDisabled={!courses?.length}
          >
            Proceed to checkout
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Cart;
