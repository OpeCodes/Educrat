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
import { Link } from "react-router-dom";

const Cart = () => {
  const dummy = [1, 2]; // Dummy data array (replace with actual cart data)

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
            {dummy.map((_, index) => (
              <Tr key={index} p={6}>
                <Td width={"100%"} maxW={"40%"} py={6}>
                  <Flex align="center">
                    <Image
                      borderRadius="5px"
                      boxSize="100px"
                      src="https://bit.ly/dan-abramov"
                      alt="Product Image"
                      mr={4}
                    />
                    <Text isTruncated maxW="100%">
                      Complete Python Bootcamp From Zero to Hero in Python
                    </Text>
                  </Flex>
                </Td>
                <Td width={"20%"}>$18</Td>
                <Td width={"20%"}>$18</Td>
                <Td width={"10%"} cursor={"pointer"}>
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
              <Text>$233.0</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Total</Text>
              <Text>$233.0</Text>
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
            as={Link}
            to={"/cart"}
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Cart;
