import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { imgL5, applestore, googlestore } from "../assets/export";

export const Ads = () => {
  return (
    <Box
      as={"section"}
      px={{ base: 6, md: 12, lg: 16 }}
      py={{ base: 4, md: 16, lg: 16 }}
    >
      <Box
        as="div"
        display={"flex"}
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          as="div"
          flexBasis={"50%"}
          mr={{ lg: 16 }}
          my={{ base: 12 }}
          mb={{ base: 12 }}
        >
          <img src={imgL5} style={{ maxWidth: "100%" }} alt="ads-img" />
        </Box>
        <Box as="div" flexBasis={"50%"}>
          <Heading as={"h1"} color={"#140342"} size={"2xl"}>
            Learn From <br />
            <Box as={"span"} color={"#6440fb"}>
              Anywhere
            </Box>
          </Heading>
          <Text as={"p"} color={"#140342"} my={8}>
            Take classes on the go with the educrat app. Stream or download to
            watch on the plane, the subway, or wherever you learn best.
          </Text>
          <Flex>
            <Box as={"div"} mr={8}>
              <img src={applestore} alt="apple-store" />
            </Box>
            <Box as={"div"}>
              <img src={googlestore} alt="google-store" />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
