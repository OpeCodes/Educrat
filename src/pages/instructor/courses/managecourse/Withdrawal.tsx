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
} from "@chakra-ui/react";
import { useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import WithdrawCash from "./WithdrawCash";
import { useGetUserWallet } from "../../../../hooks/instructor";

const Withdrawal = () => {
  const dummy = [1, 2, 3, 4, 5, 6];
  const [steps, setStep] = useState<number>(0);
 const {getUserWallet}= useGetUserWallet();
  return (
    <>
      {steps === 0 && (
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
                <Text fontWeight={"bold"}>N{getUserWallet?.balance}</Text>
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
              onClick={() => setStep(1)}
            >
              Widthdraw
            </Button>
          </Flex>
        </Stack>
      )}
      {steps === 1 && <WithdrawCash setStep={setStep} />}
    </>
  );
};

export default Withdrawal;
