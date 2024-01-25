import { Box, Text } from "@chakra-ui/react";
import { category } from "../constants/Categories";

const Category = ({ img, title, amount }: category) => {
  return (
    <Box as={"div"} w={"100%"} mb={3} cursor={"pointer"}>
      <Box
        display={"flex"}
        w={"auto"}
        h={"240px"}
        bg={"#eef2f6"}
        borderRadius={"8px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img
          src={img}
          style={{
            width: "75px",
          }}
          alt={title}
        />
      </Box>
      <Text
        as={"p"}
        fontSize={"lg"}
        color={"#140342"}
        my={1}
        _hover={{ color: "#6440fb" }}
      >
        {title}
      </Text>
      <Text as={"p"} fontSize={"14px"} color={"gray.600"}>
        {amount}+ Courses
      </Text>
    </Box>
  );
};
export default Category;
