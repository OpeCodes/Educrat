import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Flex,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import {  Link,  } from "react-router-dom";
import { RootState } from "../store/store";
import { removeCourseFromCart, setToggleCheckout } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";
import { useCreateOrder } from "../hooks/auth/price";
import { addUserCheckoutValue } from "../store/localStorage";

const Cart = () => {
  const { courses , } = useSelector((store: RootState) => store?.cart);
  const dispatch = useDispatch();
  let totalPrice = courses?.reduce(
    (acc: any, course: any) => acc + course?.price,
    0
  );
  const handleRemoveFromCart = (courseId: string) => {
    dispatch(removeCourseFromCart(courseId));
  };
  const { createOrder } = useCreateOrder();
  const idStrings = courses?.map((obj: any) => obj?.id);
  const handleCheckout = () => {
    createOrder({
      body: {
        totalAmount: totalPrice,
        courses: idStrings,
      },
    });
    dispatch(setToggleCheckout(true))
    addUserCheckoutValue(true)
  };
  return (    
    <Stack maxW={"85%"} w={"100%"} mx={"auto"}>
      <TableContainer mt={"9rem"}>
        <Table size="sm">
          <Thead>
            <Tr bg={"#F5F7FE"} color={"#6440FB"} borderRadius={10}>
              <Th color={"#6440FB"} p={6} width={"35%"}>
                Product
              </Th>
              <Th color={"#6440FB"} width={"20%"}>
                Price
              </Th>
              <Th color={"#6440FB"} width={"20%"}>
                Subtotal
              </Th>
              <Th color={"#6440FB"} width={"15%"}>
                Remove
              </Th>
            </Tr>
          </Thead>
          <Tbody>           
            {courses?.map((course: any, index) => (
              <Tr key={index} p={6}>
                <Td width={"100%"} maxW={"40%"} py={6}>
                  <Flex align="center">
                    <Image
                      borderRadius="5px"
                      boxSize="100px"
                      src={course?.img}
                      alt="Product Image"
                      mr={4}
                    />
                    <Text isTruncated maxW="100%">
                      {course?.title}
                    </Text>
                  </Flex>
                </Td>
                <Td width={"20%"}> {course?.price}</Td>
                <Td width={"20%"}>{course?.price}</Td>
                <Td
                  width={"10%"}
                  cursor={"pointer"}
                  onClick={() => handleRemoveFromCart(course?.id)}
                >
                  <MdClose fontSize={20} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack maxW={"350px"} w={"100%"} ml="auto" mt={9}>
        <Stack justify={"end"}>
          <Stack bg={"#F4F1FE"} px={6} rowGap={8} py={4} borderRadius={8}>
            <Text fontSize={20} fontWeight={500}>
              Cart Totals
            </Text>
            <Flex justify={"space-between"}>
              <Text>Subtotal</Text>
              <Text>{totalPrice}</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Total</Text>
              <Text>{totalPrice}</Text>
            </Flex>
          </Stack>
          <Button
            bg={"#6440FB"}
            py={"25px"}
            variant="solid"
            mt={3}
            fontWeight={400}
            color={"white"}
            width={"100%"}
            onClick={handleCheckout}
            as={Link}
            to={"/payment/checkout"}
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Cart;
