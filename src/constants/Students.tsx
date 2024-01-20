import { Box, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { studentsData } from "../utils/data";
import { Student } from "../components";

export const Students = () => {
  return (
    <Box
      as={"section"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={{ base: 12, md: 16, lg: 16 }}
      bg={"#f7f8fb"}
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
              Top Students
            </Heading>
            <Text as={"p"} color={"gray.600"} my={2}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </Box>
          <Box>
            <Button
              variant={"outline"}
              px={6}
              py={6}
              bg={"#f4f1fe"}
              color={"#6440fb"}
              mb={{ base: "4px" }}
              border={"none"}
              borderRadius={"full"}
              fontWeight={"normal"}
              _hover={{
                bg: "#6440fb",
                color: "white",
              }}
              rightIcon={<MdArrowOutward size={20} />}
            >
              View All Students
            </Button>
          </Box>
        </Box>
        <Box
          as="div"
          display={{ md: "grid", lg: "flex" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gridTemplateColumns={{ md: "repeat(2,1fr)" }}
          mt={10}
          gap={8}
        >
          {studentsData.map((student) => {
            return <Student key={student.id} {...student} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
};
