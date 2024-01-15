import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  Select,
  Button
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
const Courses = () => {
  return (
    <Stack>
      <Text fontSize={45} fontWeight={"600"}>
        Courses
      </Text>
      <Flex justify={"space-between"} align={"center"}>
      <Flex columnGap={7}>
        <Stack width="450px">
          <InputGroup>
            <Input placeholder="Enter search for courses" variant="filled" />
            <InputRightElement>
              <FiSearch />
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Select placeholder="Select option" variant={"filled"}>
          <option value="option1">Newest</option>
          <option value="option2">Oldest</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Button
                    bg={"#00FF84"}
                    // isLoading={isPending}
                    // loadingText="Loading"
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="end"
                    // onClick={() => handleSubmit()}
                    mt={3}
                    borderWidth={2}
                    py={3}
                    borderColor={"#00FF84"}
                    _hover={{ background: "none", color: "#00FF84" }}
                    size='lg'
                  >
                    New Course
                  </Button>
      </Flex>
    </Stack>
  );
};

export default Courses;
