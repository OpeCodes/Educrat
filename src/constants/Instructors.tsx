import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { Instructor } from "../components";
import { useGetAllDevupshotInstructors } from "../hooks/studentCourse";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  MotionBox,
  fadeUp,
  popIn,
  slideLeft,
  stagger,
} from "../components/motion";
import { motion } from "framer-motion";

export const Instructors = () => {
  const { data, isPending } = useGetAllDevupshotInstructors();
  const dummyArray = [1, 2, 3, 4];
  const arrayOfIds = Array.isArray(data) ? data.map((obj: any) => obj?.id) : [];
  const { user } = useSelector((store: RootState) => store?.user);

  return (
    <Box
      as={"section"}
      position={"relative"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={{ base: 14, md: 20 }}
      bg={"#fefbf4"}
      overflow={"hidden"}
    >
      <MotionBox
        position={"absolute"}
        top={"-80px"}
        right={"-80px"}
        w={"260px"}
        h={"260px"}
        borderRadius={"full"}
        bg={"#f59e0b"}
        opacity={0.08}
        filter={"blur(70px)"}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <Stack spacing={10} position={"relative"} zIndex={1}>
        <MotionBox
          variants={stagger(0.1)}
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
                  Mentors
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
                  Learn from senior engineers actually building in production.
                </Heading>
              </MotionBox>
              <MotionBox variants={fadeUp}>
                <Text as={"p"} color={"gray.600"} mt={4}>
                  Practitioners from FAANG, scale-ups, and open source —
                  teaching the patterns they use every day.
                </Text>
              </MotionBox>
            </Box>
            <MotionBox variants={popIn}>
              <Button
                as={motion.button}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                px={6}
                py={6}
                bg={"#f4f1fe"}
                color={"#6440fb"}
                border={"none"}
                borderRadius={"full"}
                fontWeight={500}
                _hover={{ bg: "#6440fb", color: "white" }}
                rightIcon={<MdArrowOutward size={20} />}
              >
                <Box as={Link} to={"/all-instructor"}>
                  View All Instructors
                </Box>
              </Button>
            </MotionBox>
          </Flex>
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
                <Skeleton height="200px" />
                <Skeleton height="80px" mt={1} />
              </GridItem>
            ))}
          </Grid>
        )}

        <MotionBox
          variants={stagger(0.12)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={3}
            mt={"1.5rem"}
          >
            {data &&
              Array.isArray(data) &&
              data?.slice(0, 4)?.map((instructor: any, index: any) => (
                <MotionBox
                  key={instructor.id}
                  variants={popIn}
                  whileHover={{
                    y: -8,
                    rotate: index % 2 === 0 ? -1 : 1,
                    transition: { duration: 0.25 },
                  }}
                >
                  <Instructor
                    {...instructor}
                    index={index}
                    arrayOfIds={arrayOfIds}
                  />
                </MotionBox>
              ))}
          </Grid>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Flex
            flexDir={{ base: "column" }}
            justify={"center"}
            align={"center"}
            mt={6}
            gap={1}
          >
            <Text color={"gray.600"} fontSize={"15px"} textAlign={"center"}>
              Built something developers should learn from?
            </Text>
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Text
                color={"#6440fb"}
                as={Link}
                fontSize={"15px"}
                fontWeight={600}
                to={user ? "/become-instructor" : "/sign-in"}
              >
                Teach on DevUpshot →
              </Text>
            </motion.div>
          </Flex>
        </MotionBox>
      </Stack>
    </Box>
  );
};
