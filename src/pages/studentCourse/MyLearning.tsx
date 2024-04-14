import {
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Grid,
  GridItem,
  Image,
  Progress,
  Flex,
} from "@chakra-ui/react";

const dummy = [1, 2, 3, 4, 4, , 4, 44, 4];
const MyLearning = () => {
  return (
    <Stack mt={"4.6rem"}>
        <Stack >
      <Stack backgroundColor={"black"} >
        <Text  maxW={"80%"} w="100%" mx={"auto"} color={"white"} fontSize={"2.9rem"} my={"1.2rem"} mb={"2.9rem"}>
          My learning
        </Text>
      </Stack>
      <Stack maxW={"80%"} w="100%" mx={"auto"} color="#D1D7DC"  mt={"-3.3rem"}>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab fontWeight={"bold"}>All Courses</Tab>
            <Tab fontWeight={"bold"}>Wishlist</Tab>
          </TabList>
          <TabIndicator
            mt="-1.9px"
            height="7px"
            bg="white"
            borderRadius="1px"
          />
          <TabPanels color="black">
            <TabPanel>
              <Grid templateColumns={{md: "repeat(2, 1fr)", lg:"repeat(4, 1fr)" }} gap={6} mt={6}>
                {dummy.map((dum, index) => {
                  return (
                    <GridItem w="100%" key={id}>
                      <Image
                        maxHeight={"250px"}

                        height={"100%"}
                        width={"100%"}
                        objectFit="fill"
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                      />
                      <Text mt={2} fontWeight={"bold"}>
                        NodeJS Tutorial and Projects Course
                      </Text>
                      <Text fontSize={"15px"} color={"gray"}>
                        Peter Adedokun
                      </Text>
                      <Progress value={40} size="xs" mt={2} />
                      <Flex justify={"space-between"} fontSize={13}>
                        <Text>40% complete</Text>
                        <Stack>
                          <Text>stars icon</Text>
                          <Text>Your Rating</Text>
                        </Stack>
                      </Flex>
                    </GridItem>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
      </Stack>
    </Stack>
  );
};

export default MyLearning;
