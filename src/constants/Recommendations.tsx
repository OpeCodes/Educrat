import {
  Box,
  Flex,
  Heading,
  Select,
  Text,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
import { recommendationImg } from "../assets/export";
import { useCourseCategory } from "../hooks/course";
import { FiArrowRight } from "react-icons/fi";
import {
  MotionBox,
  MotionFlex,
  MotionTag,
  fadeUp,
  popIn,
  slideLeft,
  slideRight,
  stagger,
} from "../components/motion";
import { motion } from "framer-motion";

export const Recommendations = () => {
  const { data } = useCourseCategory();
  return (
    <Box
      as={"section"}
      position={"relative"}
      px={{ base: 6, md: 12, lg: 16 }}
      py={{ base: 14, md: 20 }}
      bg={"#1A064F"}
      overflow={"hidden"}
    >
      <MotionBox
        position={"absolute"}
        top={"-100px"}
        right={"-80px"}
        w={"320px"}
        h={"320px"}
        borderRadius={"full"}
        bg={"#6440fb"}
        opacity={0.25}
        filter={"blur(80px)"}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionBox
        position={"absolute"}
        bottom={"-120px"}
        left={"30%"}
        w={"260px"}
        h={"260px"}
        borderRadius={"full"}
        bg={"#0ea5e9"}
        opacity={0.18}
        filter={"blur(80px)"}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <MotionFlex
        position={"relative"}
        zIndex={1}
        justifyContent={"space-between"}
        alignItems={{ base: "start", lg: "center" }}
        flexDirection={{ base: "column", lg: "row" }}
        gap={12}
        variants={stagger(0.12)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.25 }}
      >
        <Box maxW={"640px"} flex={1}>
          <MotionTag
            variants={popIn}
            size={"md"}
            bg={"whiteAlpha.200"}
            color={"white"}
            borderRadius={"full"}
            px={4}
            py={2}
            mb={5}
            fontWeight={600}
            whileHover={{ y: -2 }}
          >
            Personalized roadmap
          </MotionTag>
          <MotionBox variants={slideLeft}>
            <Heading
              as={"h2"}
              color={"white"}
              fontSize={{ base: "30px", md: "42px" }}
              lineHeight={1.15}
              letterSpacing={"-0.02em"}
            >
              Tell us your goal. We'll plan the path.
            </Heading>
          </MotionBox>
          <MotionBox variants={fadeUp}>
            <Text color={"whiteAlpha.800"} mt={4} fontSize={"md"} maxW={"520px"}>
              Pick a focus area and skill level — we'll generate a structured
              learning path with courses, projects, and milestones.
            </Text>
          </MotionBox>

          <MotionBox
            variants={fadeUp}
            mt={10}
            p={{ base: 4, md: 6 }}
            borderRadius={"20px"}
            bg={"whiteAlpha.100"}
            backdropFilter={"blur(10px)"}
            border={"1px solid"}
            borderColor={"whiteAlpha.200"}
            whileHover={{ borderColor: "rgba(255,255,255,0.35)" }}
          >
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={3}
              alignItems={{ base: "stretch", md: "center" }}
            >
              <Select
                size={"lg"}
                variant={"filled"}
                placeholder="Focus area"
                color={"white"}
                bg={"whiteAlpha.200"}
                border={"none"}
                borderRadius={"12px"}
                focusBorderColor="#6440fb"
                _hover={{ bg: "whiteAlpha.300" }}
                fontSize={"15px"}
                sx={{
                  "& option": { color: "black", background: "white" },
                }}
              >
                {data?.map((values: any) => (
                  <option key={values.id} value={values.id}>
                    {values.name}
                  </option>
                ))}
              </Select>
              <Select
                size={"lg"}
                variant={"filled"}
                placeholder="Skill level"
                color={"white"}
                bg={"whiteAlpha.200"}
                border={"none"}
                borderRadius={"12px"}
                focusBorderColor="#6440fb"
                _hover={{ bg: "whiteAlpha.300" }}
                fontSize={"15px"}
                sx={{
                  "& option": { color: "black", background: "white" },
                }}
              >
                <option value={"Beginner"}>Beginner</option>
                <option value={"Intermediate"}>Intermediate</option>
                <option value={"Advanced"}>Advanced</option>
              </Select>
              <Button
                as={motion.button}
                whileHover={{
                  y: -3,
                  boxShadow: "0 14px 30px rgba(100,64,251,0.5)",
                }}
                whileTap={{ scale: 0.96 }}
                px={8}
                py={6}
                bg={"#6440fb"}
                color={"white"}
                borderRadius={"12px"}
                fontWeight={600}
                rightIcon={
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ display: "inline-flex" }}
                  >
                    <FiArrowRight />
                  </motion.span>
                }
                _hover={{ bg: "#5232e8" }}
                flexShrink={0}
              >
                Plan it
              </Button>
            </Flex>
          </MotionBox>

          <MotionBox
            variants={stagger(0.07, 0.3)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true }}
            mt={6}
          >
            <HStack spacing={4} flexWrap={"wrap"} rowGap={2}>
              <Text color={"whiteAlpha.700"} fontSize={"sm"}>
                Popular paths:
              </Text>
              {[
                "Frontend Engineer",
                "Cloud / DevOps",
                "AI Engineer",
                "Backend",
              ].map((p) => (
                <MotionTag
                  key={p}
                  variants={popIn}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  size={"md"}
                  bg={"whiteAlpha.150"}
                  color={"white"}
                  borderRadius={"full"}
                  cursor={"pointer"}
                  _hover={{ bg: "whiteAlpha.300" }}
                >
                  {p}
                </MotionTag>
              ))}
            </HStack>
          </MotionBox>
        </Box>

        <MotionBox
          flex={1}
          maxW={{ lg: "520px" }}
          w={"100%"}
          variants={slideRight}
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={recommendationImg}
              alt={"Personalized learning roadmap"}
              w={"100%"}
            />
          </motion.div>
        </MotionBox>
      </MotionFlex>
    </Box>
  );
};
