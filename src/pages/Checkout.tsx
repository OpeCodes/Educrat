import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Checkout = () => {
  const { courses } = useSelector((store: RootState) => store?.cart);

  return (
    <Stack mt={"5rem"}>
      <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} columnGap={5}>
        <GridItem
          height="100vh"
          justifyContent={"center"}
          alignContent={"center"}
          display={"flex"}
          mt={"2rem"}
        >
          <Stack>
            <Text fontSize={"2rem"} fontWeight={"500"}>
              Checkout
            </Text>
            <Text fontSize={"1.5rem"} fontWeight={"500"}>
              Billing address
            </Text>
            <Stack>
              <Text fontSize={"1.5rem"} fontWeight={"700"}>
                Order details
              </Text>
              {courses?.map((course: any) => {
                return (
                  <Flex
                    mt={"rem"}
                    columnGap={10}
                    justify={"space-between"}
                    align={"center"}
                  >
                    <Flex columnGap={2} align={"center"}>
                      <Image
                        boxSize="40px"
                        objectFit="cover"
                        src={course.img}
                        alt="Dan Abramov"
                      />
                      <Text fontWeight={"bold"}>
                        HTML&CSS Tutorial and Projects Course (Flexbox&Grid)
                        {course.title}
                      </Text>
                    </Flex>
                    <Text>100</Text>
                  </Flex>
                );
              })}
            </Stack>
          </Stack>
        </GridItem>
        <GridItem w="100%">
          <Box
            boxSize="sm"
            w="50%"
            h="100vh"
            bg={"#f7f9fa"}
            mx={"auto"}
            display={{ base: "none", lg: "block" }}
            position={"fixed"}
          >
            <Text fontWeight={"bold"}>Summary</Text>
            <Stack>
              <Flex>
                <Text>Original Price</Text>
                <Text>N1000</Text>
              </Flex>
              <Flex>
                <Text>Original Price</Text>
                <Text>N1000</Text>
              </Flex>

              <Divider />
              <Flex fontWeight={"bold"}>
                <Text>Original Price</Text>
                <Text>N1000</Text>
              </Flex>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Checkout;
