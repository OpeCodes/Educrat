import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  Select,
  Button,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
const Courses = () => {
  return (
    <Stack>
      <Text fontSize={45} fontWeight={"600"}>
        Courses
      </Text>
      <Flex justify={"space-between"} align={"center"} flexWrap={"wrap"} rowGap={0}>
        <Flex columnGap={7} flexWrap={"wrap"} rowGap={5}>
          <Stack width="55%">
            <InputGroup>
              <Input placeholder="Enter search for courses" variant="filled" />
              <InputRightElement>
                <FiSearch />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Select placeholder="Select option" variant={"filled"} width={"35%"}>
            <option value="option1">Newest</option>
            <option value="option2">Oldest</option>
            <option value="option3">Option 3</option>
          </Select>
        </Flex>
        <Button
          bg={"#00FF84"}
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="end"
          // onClick={() => handleSubmit()}
          mt={3}
          borderWidth={2}
          py={3}
          borderColor={"#00FF84"}
          _hover={{ background: "none", color: "#00FF84" }}
          size="lg"
        >
          New Course
        </Button>
      </Flex>
    </Stack>
  );
};

export default Courses;
