import { Box, Stack, Heading, Text } from "@chakra-ui/react";

type Article = {
  id: number;
  img: string;
  category: string;
  title: string;
  date: string;
};

const Article = ({ id, img, category, title, date }: Article) => {
  return (
    <Box
      as="div"
      width={"100%"}
      height={"auto"}
      cursor={"pointer"}
      key={id}
      mb={{ base: 8 }}
    >
      <Stack>
        <Box as="div">
          <img
            src={img}
            style={{ borderRadius: "10px", width: "100%" }}
            alt="news-img"
          />
        </Box>
        <Box>
          <Text color={"gray.600"} fontSize={"15px"} mb={2}>
            {category.toLocaleUpperCase()}
          </Text>
          <Heading
            as={"h3"}
            fontSize={"23px"}
            color={"#242239"}
            fontWeight={"normal"}
            my={2}
          >
            {title}
          </Heading>
          <Text color={"gray.600"} fontSize={"16px"} mb={2}>
            {date}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
export default Article;
