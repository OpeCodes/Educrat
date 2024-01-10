import { InstructorNavbar } from "../../components";
import {
  Box,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator
} from "@chakra-ui/react";
const BecomeInstructor = () => {
  return (
    <Stack>
      <InstructorNavbar />
      <Stack ml={16} mr={10}>
        <Box mt={3}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Sign Up
          </Text>
          <Text fontSize={"18px"}>Your impacting journey begins here!</Text>
        </Box>
        <Tabs position="relative" >
        <TabList fontWeight={"bold"}>
          <Tab  _selected={{fontWeight: "bold"}} fontWeight={"bold"}>Educrat Profile</Tab>
          <Tab fontWeight={"bold"}>Profile Picture</Tab>
          <Tab fontWeight={"bold"}>Three</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="black"
          borderRadius="1px"
          opacity={"0.5"}
          fontWeight={"bold"}
          
        />
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
     
      </Stack>
     
    </Stack>
  );
};

export default BecomeInstructor;
