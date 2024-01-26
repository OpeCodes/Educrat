import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { ctaData } from "../utils/data";

type Info = {
  id: number;
  img: string;
  title: string;
  desc: string;
};

export const Cta = () => {
  return (
    <Box
      as={"section"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={{ base: 4, md: 16, lg: 16 }}
    >
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        my={4}
      >
        <Heading
          as={"h1"}
          textAlign={"center"}
          color={"#140342"}
          fontSize={"36px"}
        >
          Start your Learning Journey Today!
        </Heading>
        <Text as={"p"} color={"gray.600"} my={2}>
          Lorem ipsum dolor sit amet, consectetur.
        </Text>
      </Flex>
      <Box
        as="div"
        display={{ md: "grid", lg: "flex" }}
        flexDir={{ base: "column", lg: "row" }}
        gridTemplateColumns={{ md: "repeat(2,1fr)" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={14}
        gap={6}
      >
        {ctaData.map(({ id, img, title, desc }: Info) => {
          return (
            <Flex
              p={8}
              borderRadius={"10px"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              key={id}
              _hover={{ boxShadow: "lg" }}
            >
              <img src={img} alt={title} />
              <Heading
                as={"h3"}
                color={"#140342"}
                fontSize={"18px"}
                fontWeight={"regular"}
                mt={3}
              >
                {title}
              </Heading>
              <Text as={"p"} my={2} color={"gray.600"} fontSize={"15px"}>
                {desc}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};
