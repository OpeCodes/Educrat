import {
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

const MyLearning = () => {
  return (
    <Stack mt={"4.6rem"}>
      <Stack backgroundColor={"black"} p={"2.7rem"}>
        <Text ml={"4rem"} color={"white"} fontSize={"2.9rem"}>
          My learning
        </Text>
      </Stack>
      <Stack color="#D1D7DC"  ml={"6.9rem"} mt={"-3.3rem"}>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab  fontWeight={"bold"}>All Courses</Tab>
            <Tab fontWeight={"bold"}>Wishlist</Tab>
          </TabList>
          <TabIndicator
            mt="-1.0px"
            height="7px"
            bg="white"
            borderRadius="1px"
          />
          <TabPanels  color="black">
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>          
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
}

export default MyLearning;
