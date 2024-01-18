import { Box, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { categoriesData } from "../utils/data";
import { Category } from "../components/index";

export interface category {
  id: number;
  img: string;
  title: string;
  amount: number;
}

export const Categories = () => {
  return (
    <Box
      as={"section"}
      position={"relative"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={{ base: 4, md: 16, lg: 16 }}
    >
      <Stack>
        <Box
          as={"div"}
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "start", lg: "center" }}
        >
          <Box mb={{ base: "10px" }}>
            <Heading as={"h1"} color={"#140342"} size={"xl"}>
              Top Categories
            </Heading>
            <Text as={"p"} color={"gray.600"} my={2}>
              10,000+ unique online course list designs
            </Text>
          </Box>
          <Box>
            <Button
              variant={"outline"}
              px={10}
              py={6}
              bg={"#eef2f6"}
              color={"#6440fb"}
              mb={{ base: "4px" }}
              border={"none"}
              borderRadius={"10px"}
              fontWeight={"normal"}
              _hover={{
                bg: "#6440fb",
                color: "white",
              }}
              rightIcon={<MdArrowOutward size={20} />}
            >
              Join For Free
            </Button>
          </Box>
        </Box>
        <Box
          as="div"
          display={"grid"}
          gridGap={8}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
          mt={8}
        >
          {categoriesData.map((category: category) => {
            return <Category key={category.id} {...category} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
};
