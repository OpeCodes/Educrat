import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const Checkout = () => {
  return (
    <Stack mt={"5rem"}>
      <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} columnGap={5}>
        <GridItem
          height="100vh"
          // mx={{ base: "15px", lg: "20px" }}
          justifyContent={"center"}
          alignContent={"center"}
          display={"flex"}
          mt={"2rem"}
          // maxWeight={"50%"}
        >
          <Stack>
            <Text fontSize={"2rem"} fontWeight={"500"}>
              Checkout
            </Text>
            <Text fontSize={"1.5rem"} fontWeight={"500"}>
              Billing address
            </Text>
            <Stack>
              <Text fontSize={"1.8rem"} fontWeight={"500"}>
                Order details
              </Text>

              <Flex columnGap={10} justify={"space-between"} align={"center"}>
                <Flex columnGap={3} align={"center"}>
                  <Image
                    boxSize="45px"
                    objectFit="cover"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                  <Text fontWeight={"bold"}>
                    HTML&CSS Tutorial and Projects Course (Flexbox&Grid)
                  </Text>
                </Flex>
                <Text>100</Text>
              </Flex>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem w="100%">
          <Box
            boxSize="sm"
            w="50%"
            h="100vh"
            bg={"#140342"}
            mx={"auto"}
            display={{ base: "none", lg: "block" }}
            position={"fixed"}
          ></Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Checkout;
