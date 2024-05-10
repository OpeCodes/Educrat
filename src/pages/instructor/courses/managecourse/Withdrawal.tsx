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
} from "@chakra-ui/react";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";

const Withdrawal = () => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Widthdrawal
      </Text>
      <Divider />
      <Stack px={5}>
        <Text fontSize={19} fontWeight={"bold"}>
          Transaction
        </Text>
        <Flex columnGap={4}>
          <Stack fontSize={15} fontWeight={"600"}>
            <Text>Available Balance</Text>
            <Text>N100</Text>
          </Stack>
          <Stack fontSize={15} fontWeight={"600"}>
            <Text>Withdraw</Text>
            <Text>N100</Text>
          </Stack>
        </Flex>
        <Stack my={"1rem"}>
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
                  <p>one1!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Withdrawal;
