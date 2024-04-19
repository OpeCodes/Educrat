import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
} from "@chakra-ui/react";
const Cart = () => {
  const dummy = [1, 2];
  return (
    <Stack maxW={"85%"} w={"100%"} mx={"auto"}>
      <TableContainer mt={"9rem"}>
        <Table size="sm">
          <Thead>
            <Tr bg={"red"}>
              <Th p={6}>Product</Th>
              <Th>Price</Th>
              <Th>Subtotal</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          {dummy.map(() => {
            return (
              <Tbody p={6}>
                <Tr p={6}>
                  <Td p={6} py={10}>
                    inches1
                  </Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                </Tr>
              </Tbody>
            );
          })}
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Cart;
