import {
  Box,
  Heading,
  Text,
  Stack,
  Skeleton,
  Grid,
  GridItem,
  HStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Course } from "../components/index";
import { useGetCourse } from "../hooks/course";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import {
  MotionBox,
  MotionTag,
  fadeUp,
  popIn,
  slideLeft,
  stagger,
} from "../components/motion";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "DevOps",
  "AI / ML",
  "Mobile",
  "Cloud",
  "System Design",
];

export const Courses = () => {
  const { data, isPending } = useGetCourse();
  const dummyArray = [1, 2, 3, 4];

  return (
    <Box
      as={"section"}
      position={"relative"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={20}
    >
      <Stack spacing={10}>
        <MotionBox
          variants={stagger(0.12)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={"space-between"}
            alignItems={{ base: "start", lg: "end" }}
            gap={6}
          >
            <Box maxW={"640px"}>
              <MotionBox variants={slideLeft}>
                <Text
                  color={"#6440fb"}
                  fontWeight={700}
                  textTransform={"uppercase"}
                  letterSpacing={"0.15em"}
                  fontSize={"sm"}
                  mb={3}
                >
                  Featured courses
                </Text>
              </MotionBox>
              <MotionBox variants={fadeUp}>
                <Heading
                  as={"h2"}
                  color={"#140342"}
                  fontSize={{ base: "30px", md: "40px" }}
                  letterSpacing={"-0.02em"}
                  lineHeight={1.15}
                >
                  Build skills employers are hiring for — right now.
                </Heading>
              </MotionBox>
              <MotionBox variants={fadeUp}>
                <Text as={"p"} color={"gray.600"} mt={4} fontSize={"md"}>
                  Hand-picked, project-based courses across the stack. Ship a
                  portfolio piece with every track.
                </Text>
              </MotionBox>
            </Box>
            <MotionBox variants={popIn}>
              <Button
                as={motion.button}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                variant={"outline"}
                px={6}
                py={6}
                color={"#6440fb"}
                borderColor={"#6440fb"}
                borderRadius={"full"}
                fontWeight={500}
                rightIcon={<MdArrowOutward size={20} />}
                _hover={{ bg: "#6440fb", color: "white" }}
              >
                <Box as={Link} to={"/all-courses"}>
                  See all courses
                </Box>
              </Button>
            </MotionBox>
          </Flex>
        </MotionBox>

        <MotionBox
          variants={stagger(0.06)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: true, amount: 0.4 }}
        >
          <HStack spacing={3} flexWrap={"wrap"} rowGap={3}>
            {categories.map((cat, i) => (
              <MotionTag
                key={cat}
                variants={popIn}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                size={"lg"}
                borderRadius={"full"}
                px={5}
                py={2}
                cursor={"pointer"}
                bg={i === 0 ? "#140342" : "#f4f1fe"}
                color={i === 0 ? "white" : "#140342"}
                fontWeight={500}
                _hover={{
                  bg: i === 0 ? "#140342" : "#6440fb",
                  color: "white",
                }}
              >
                {cat}
              </MotionTag>
            ))}
          </HStack>
        </MotionBox>

        {isPending && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {dummyArray.map((_, index) => (
              <GridItem w="100%" key={index}>
                <Skeleton height="200px" borderRadius={"12px"} />
                <Skeleton height="80px" mt={2} borderRadius={"8px"} />
              </GridItem>
            ))}
          </Grid>
        )}

        <MotionBox
          variants={stagger(0.1)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: true, amount: 0.15 }}
        >
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
            }}
            gap={6}
            alignItems={"start"}
          >
            {data?.data?.map((course: any) => (
              <MotionBox
                key={course.id}
                variants={popIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Course {...course} />
              </MotionBox>
            ))}
          </Grid>
        </MotionBox>
      </Stack>
    </Box>
  );
};
