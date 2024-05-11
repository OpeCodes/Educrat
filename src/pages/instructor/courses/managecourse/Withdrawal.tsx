import {
  Divider,
  Flex,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { useVerifyUserPassword } from "../../../../hooks/withdrawal";

const Withdrawal = () => {
  const dummy = [1, 2, 3, 4, 5, 6];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { verifyUserPassword,verifyUserPasswordLoading } = useVerifyUserPassword();
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Withdrawal
      </Text>
      <Divider />
      <Stack px={5}>
        <Text fontSize={19} fontWeight={"bold"}>
          Transaction
        </Text>
        <Flex columnGap={4}>
          <Stack fontSize={15} fontWeight={"600"}>
            <Text>Available Balance</Text>
            <Text fontWeight={"bold"}>N100</Text>
          </Stack>
        </Flex>
        <Stack mt={"1rem"}>
          <Text fontSize={18} fontWeight={"bold"}>
            Recent Transactions
          </Text>
          <Stack>
            <Tabs variant="unstyled">
              <TabList justifyContent={"center"}>
                <Tab
                  _selected={{ color: "white", bg: "black" }}
                  borderRadius={5}
                  display={"flex"}
                  columnGap={1}
                >
                  <Text>
                    <IoArrowDownOutline />
                  </Text>
                  <Text>In-Flow</Text>
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "black" }}
                  borderRadius={5}
                  display={"flex"}
                  columnGap={1}
                >
                  <Text>
                    <IoArrowUpOutline />
                  </Text>
                  <Text>Out-Flow</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TableContainer>
                    <Table size="sm" variant={"simple"}>
                      <Thead>
                        <Tr>
                          <Th color={"black"}>Date</Th>
                          <Th color={"black"}>Amount</Th>
                          <Th color={"black"}>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dummy.map(() => {
                          return (
                            <Tr>
                              <Td>inches</Td>
                              <Td>millimetres (mm)</Td>
                              <Td>Sucessful</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table size="sm" variant={"simple"}>
                      <Thead>
                        <Tr>
                          <Th color={"black"}>Date</Th>
                          <Th color={"black"}>Amount</Th>
                          <Th color={"black"}>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dummy.map(() => {
                          return (
                            <Tr>
                              <Td>inches</Td>
                              <Td>millimetres (mm)</Td>
                              <Td>Sucessful</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      </Stack>
      <Flex justify={"flex-end"} p={3}>
        <Button
          bg={"black"}
          color={"white"}
          mt={3}
          borderWidth={2}
          py={3}
          onClick={onOpen}
        >
          Widthdraw
        </Button>
      </Flex>

      <Modal
        // initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align={"center"}>
              <Text>Enter your password to continue</Text>
              <ModalCloseButton mt={2.5} />
            </Flex>
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"black"}
              color={"white"}
              mr={3}
              spinnerPlacement="end"
              isLoading={verifyUserPasswordLoading}
              onClick={() => {
                if (!password) return;
                verifyUserPassword({ password });
              }}
            >
              OK
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Withdrawal;
