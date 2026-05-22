import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import WithdrawCash from "./WithdrawCash";
import {
  useGetUserWallet,
  useGetUserWalletLogs,
} from "../../../hooks/instructor";
import { formatEnrollDate } from "../../../components/TimeFormat";
import { Loading } from "../../../components";

const statusColor = (status: string) => {
  if (status === "successful") return "#10b981";
  if (status === "failed") return "#ef4444";
  return "#6b7280";
};

const Withdrawal = () => {
  const [steps, setStep] = useState<number>(0);
  const { getUserWallet, isPending } = useGetUserWallet();
  const { getUserWalletLogs } = useGetUserWalletLogs(getUserWallet?.id);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      {steps === 0 && (
        <Stack spacing={8}>
          <Box
            borderRadius="28px"
            px={{ base: 5, md: 7 }}
            py={{ base: 6, md: 8 }}
            bgGradient="linear(135deg, #140342 0%, #2d0b8a 48%, #6440fb 100%)"
            color="white"
            boxShadow="0 24px 55px rgba(20,3,66,0.16)"
          >
            <Stack spacing={3} maxW="720px">
              <Badge alignSelf="start" bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
                Payouts
              </Badge>
              <Text fontSize={{ base: "30px", md: "40px" }} fontWeight={700} letterSpacing="-0.03em">
                Track your earnings and move money out with confidence.
              </Text>
              <Text color="whiteAlpha.800">
                Review wallet activity, monitor inflow and outflow, and request a withdrawal when you are ready.
              </Text>
            </Stack>
          </Box>

          <Flex gap={6} direction={{ base: "column", lg: "row" }}>
            <Box className="surface-card" borderRadius="24px" p={5} flex="1">
              <Text color="#4f547b" fontSize="sm">
                Available balance
              </Text>
              <Text fontSize="3xl" fontWeight={700} color="#140342">
                N{getUserWallet?.balance}
              </Text>
            </Box>
            <Box className="surface-card" borderRadius="24px" p={5} flex="1">
              <Text color="#4f547b" fontSize="sm">
                Wallet status
              </Text>
              <Text fontSize="xl" fontWeight={700} color="#140342">
                Active
              </Text>
            </Box>
          </Flex>

          <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 6 }}>
            <Flex justify="space-between" align={{ base: "start", md: "center" }} gap={5} flexWrap="wrap" mb={6}>
              <Stack spacing={1}>
                <Text fontSize="2xl" fontWeight={700} color="#140342">
                  Recent transactions
                </Text>
                <Text color="#4f547b">
                  Review recent inflow and outflow entries in your wallet.
                </Text>
              </Stack>
              <Button
                bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                color="white"
                onClick={() => setStep(1)}
                boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
              >
                Withdraw cash
              </Button>
            </Flex>

            <Tabs variant="unstyled" width={"100%"}>
              <TabList gap={3} flexWrap="wrap">
                <Tab borderRadius="full" px={5} py={3} fontWeight={700} _selected={{ color: "white", bg: "#140342" }}>
                  <Flex columnGap={2} align="center">
                    <IoArrowDownOutline />
                    <Text>In-Flow</Text>
                  </Flex>
                </Tab>
                <Tab borderRadius="full" px={5} py={3} fontWeight={700} _selected={{ color: "white", bg: "#140342" }}>
                  <Flex columnGap={2} align="center">
                    <IoArrowUpOutline />
                    <Text>Out-Flow</Text>
                  </Flex>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0} pt={6}>
                  <TableContainer width={"100%"}>
                    <Table size="md" variant={"simple"} width={"100%"}>
                      <Thead>
                        <Tr>
                          <Th color={"#4f547b"}>Date</Th>
                          <Th color={"#4f547b"}>Amount</Th>
                          <Th color={"#4f547b"}>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody width={"100%"}>
                        {getUserWalletLogs?.data?.map(({ amount, clerk, status, updatedAt }: any, index: number) =>
                          clerk === "credit" ? (
                            <Tr width={"100%"} key={index}>
                              <Td fontWeight={"500"}>{formatEnrollDate(updatedAt)}</Td>
                              <Td fontWeight={"500"}>{amount}</Td>
                              <Td fontWeight={"700"} color={statusColor(status)}>
                                {status}
                              </Td>
                            </Tr>
                          ) : null
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel px={0} pt={6}>
                  <TableContainer>
                    <Table size="md" variant={"simple"}>
                      <Thead>
                        <Tr>
                          <Th color={"#4f547b"}>Date</Th>
                          <Th color={"#4f547b"}>Amount</Th>
                          <Th color={"#4f547b"}>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getUserWalletLogs?.data?.map(({ amount, clerk, status, updatedAt }: any, index: number) =>
                          clerk === "debit" ? (
                            <Tr width={"100%"} key={index}>
                              <Td fontWeight={"500"}>{formatEnrollDate(updatedAt)}</Td>
                              <Td fontWeight={"500"}>{amount}</Td>
                              <Td fontWeight={"700"} color={statusColor(status)}>
                                {status}
                              </Td>
                            </Tr>
                          ) : null
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      )}
      {steps === 1 && <WithdrawCash setStep={setStep} />}
    </>
  );
};

export default Withdrawal;
