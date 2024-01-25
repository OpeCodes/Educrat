import { Box, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { newsData } from "../utils/data";
import { Article, MedArticle } from "../components";

export const News = () => {
  return (
    <Box
      as={"section"}
      px={{ base: 6, md: 12, lg: 16 }}
      py={{ base: 10, md: 16, lg: 16 }}
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
              News & Events
            </Heading>
            <Text as={"p"} color={"gray.600"} my={2}>
              Lorem ipsum dolor sit amet, consectetur.
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
              Browse Blog
            </Button>
          </Box>
        </Box>
        <Box
          as={"div"}
          display={{ md: "grid", lg: "flex" }}
          flexDir={{ base: "column", lg: "row" }}
          gridTemplateColumns={{ md: "repeat(2,1fr)" }}
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={10}
          gap={8}
        >
          {newsData.map((article) => {
            return <Article key={article.id} {...article} />;
          })}
          <Box as={"div"} w={"full"}>
            <MedArticle />
            <MedArticle />
            <MedArticle />
            <MedArticle />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
