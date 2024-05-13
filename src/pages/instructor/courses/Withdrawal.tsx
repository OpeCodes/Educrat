import {
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
import {
  useGetUserWallet,
  useGetUserWalletLogs,
} from "../../../hooks/instructor";
import { formatEnrollDate } from "../../../components/TimeFormat";

const Withdrawal = () => {
  const [steps, setStep] = useState<number>(0);
  const { getUserWallet } = useGetUserWallet();
  const { getUserWalletLogs } = useGetUserWalletLogs(getUserWallet?.id);
  return (
    <>
      {steps === 0 && (
        <Stack>
          <Text fontSize={20} fontWeight={"bold"}></Text>
          <Text fontSize={45} fontWeight={"600"}>
            Withdrawal
          </Text>
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
              <Text fontSize={18} fontWeight={"bold"} mb={2}>
                Recent Transactions
              </Text>
              <Stack>
                <Tabs variant="unstyled" width={"100%"}>
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
                      <TableContainer width={"100%"}>
                        <Table size="md" variant={"simple"} width={"100%"}>
                          <Thead>
                            <Tr>
                              <Th color={"black"}>Date</Th>
                              <Th color={"black"}>Amount</Th>
                              <Th color={"black"}>Status</Th>
                            </Tr>
                          </Thead>
                          <Tbody width={"100%"}>
                            {getUserWalletLogs?.data?.map(
                              ({
                                amount,
                                clerk,
                                status,
                                updatedAt,
                              }: any) => {
                                return (
                                  <>
                                    {clerk === "credit" && (
                                      <Tr width={"100%"}>
                                        <Td fontWeight={"500"}>{formatEnrollDate(updatedAt)}</Td>
                                        <Td fontWeight={"500"}>{amount}</Td>
                                        <Td
                                          fontWeight={"500"}
                                          color={
                                            status === "successful"
                                              ? "green"
                                              : "gray"
                                          }
                                        >
                                          {status}
                                        </Td>
                                      </Tr>
                                    )}
                                  </>
                                );
                              }
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel>
                      <TableContainer>
                        <Table size="md" variant={"simple"}>
                          <Thead>
                            <Tr>
                              <Th color={"black"}>Date</Th>
                              <Th color={"black"}>Amount</Th>
                              <Th color={"black"}>Status</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {getUserWalletLogs?.data?.map(
                              ({
                                amount,
                                clerk,
                                status,
                                updatedAt,
                              }: any) => {
                                return (
                                  <>
                                    {clerk === "debit" && (
                                      <Tr width={"100%"}>                                                                           <Td fontWeight={"500"}>{formatEnrollDate(updatedAt)}</Td>
                                        <Td fontWeight={"500"}>{amount}</Td>
                                        <Td
                                          fontWeight={"500"}
                                          color={
                                            status === "successful"
                                              ? "green"
                                              : "gray"
                                          }
                                        >
                                          {status}
                                        </Td>
                                      </Tr>
                                    )}
                                  </>
                                );
                              }
                            )}
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
              mt={-7}
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
