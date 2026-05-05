import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  HStack,
  TagLabel,
  Avatar,
  AvatarGroup,
  Icon,
} from "@chakra-ui/react";
import heroImg from "../assets/hero_img.svg";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MotionBox,
  MotionFlex,
  MotionTag,
  MotionImage,
  MotionButton,
  AnimatedCount,
  fadeUp,
  popIn,
  stagger,
  wordStagger,
  wordItem,
  orbDrift,
} from "../components/motion";
import { useRef } from "react";

const headlineLine1 = ["Level", "up", "the", "skills", "that"];
const headlineLine2 = ["ship", "real", "products."];

const stats: { label: string; value: number; suffix?: string; prefix?: string; decimal?: boolean }[] = [
  { label: "Active learners", value: 17, suffix: "M+" },
  { label: "Expert-led courses", value: 1200, suffix: "+" },
  { label: "Career outcomes", value: 92, suffix: "%" },
  { label: "Avg. course rating", value: 4.9, suffix: "★", decimal: true },
];

export const Header = () => {
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-50, 50], [8, -8]), {
    stiffness: 120,
    damping: 14,
  });
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-10, 10]), {
    stiffness: 120,
    damping: 14,
  });

  const onHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = heroWrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };
  const onHeroLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Box
      as={"section"}
      position={"relative"}
      overflow={"hidden"}
      px={{ base: "6", md: "12", lg: "16" }}
      pt={{ base: "120px", md: "150px", lg: "170px" }}
      pb={{ base: 14, md: 20 }}
      bgGradient={"linear(to-b, #f5f3ff 0%, #ffffff 70%)"}
    >
      <MotionBox
        position={"absolute"}
        top={"-120px"}
        right={"-120px"}
        w={"420px"}
        h={"420px"}
        borderRadius={"full"}
        bg={"#6440fb"}
        opacity={0.12}
        filter={"blur(80px)"}
        zIndex={0}
        {...orbDrift(0)}
      />
      <MotionBox
        position={"absolute"}
        bottom={"-160px"}
        left={"-100px"}
        w={"380px"}
        h={"380px"}
        borderRadius={"full"}
        bg={"#1A064F"}
        opacity={0.1}
        filter={"blur(90px)"}
        zIndex={0}
        {...orbDrift(2)}
      />
      <MotionBox
        position={"absolute"}
        top={"40%"}
        left={"45%"}
        w={"260px"}
        h={"260px"}
        borderRadius={"full"}
        bg={"#0ea5e9"}
        opacity={0.06}
        filter={"blur(70px)"}
        zIndex={0}
        {...orbDrift(4)}
      />

      <Stack position={"relative"} zIndex={1}>
        <MotionFlex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "start", lg: "center" }}
          gap={{ base: 12, lg: 8 }}
          variants={stagger(0.12)}
          initial={"hidden"}
          animate={"show"}
        >
          <Box flex={1} maxW={{ lg: "640px" }}>
            <MotionTag
              variants={popIn}
              size={"lg"}
              bg={"white"}
              color={"#6440fb"}
              borderRadius={"full"}
              px={4}
              py={2}
              mb={6}
              boxShadow={"0 6px 20px rgba(100,64,251,0.10)"}
              border={"1px solid"}
              borderColor={"rgba(100,64,251,0.18)"}
              whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(100,64,251,0.22)" }}
            >
              <motion.span
                animate={{ rotate: [0, 12, -8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-flex", marginRight: 8 }}
              >
                <Icon as={HiSparkles} />
              </motion.span>
              <TagLabel fontWeight={600}>
                New cohort: Full-Stack Engineering — May 2026
              </TagLabel>
            </MotionTag>

            <Heading
              as={"h1"}
              color={"#140342"}
              fontSize={{ base: "36px", md: "48px", lg: "56px" }}
              lineHeight={1.1}
              letterSpacing={"-0.02em"}
              style={{ perspective: 800 }}
            >
              <MotionBox
                as={"span"}
                display={"block"}
                variants={wordStagger}
                initial={"hidden"}
                animate={"show"}
              >
                {headlineLine1.map((w, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    variants={wordItem}
                    style={{ display: "inline-block", marginRight: 12 }}
                  >
                    {w}
                  </motion.span>
                ))}
              </MotionBox>
              <MotionBox
                as={"span"}
                display={"block"}
                color={"#6440fb"}
                variants={wordStagger}
                initial={"hidden"}
                animate={"show"}
                transition={{ delayChildren: 0.4 }}
              >
                {headlineLine2.map((w, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    variants={wordItem}
                    style={{ display: "inline-block", marginRight: 12 }}
                  >
                    {w}
                  </motion.span>
                ))}
              </MotionBox>
            </Heading>

            <MotionBox variants={fadeUp}>
              <Text
                as={"p"}
                color={"gray.600"}
                fontSize={{ base: "16px", md: "18px" }}
                my={6}
                maxW={"560px"}
              >
                Project-based courses, senior engineer mentors, and verified
                certificates — built for developers who want to grow into the
                roles they actually want.
              </Text>
            </MotionBox>

            <MotionFlex
              flexDirection={{ base: "column", sm: "row" }}
              alignItems={{ base: "stretch", sm: "center" }}
              gap={4}
              mb={10}
              variants={stagger(0.1, 0.4)}
              initial={"hidden"}
              animate={"show"}
            >
              <MotionButton
                variants={popIn}
                whileHover={{
                  y: -3,
                  boxShadow: "0 18px 36px rgba(100,64,251,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                px={10}
                py={7}
                bg={"#6440fb"}
                color={"white"}
                borderRadius={"full"}
                fontWeight={600}
                rightIcon={
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "inline-flex" }}
                  >
                    <FiArrowRight />
                  </motion.span>
                }
                _hover={{ bg: "#5232e8" }}
                as={Link}
                to={"/sign-up"}
              >
                Start learning free
              </MotionButton>
              <MotionButton
                variants={popIn}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                variant={"ghost"}
                px={6}
                py={7}
                color={"#140342"}
                borderRadius={"full"}
                fontWeight={600}
                leftIcon={<FiPlayCircle size={22} />}
                _hover={{ bg: "blackAlpha.50" }}
                as={Link}
                to={"/all-courses"}
              >
                Browse courses
              </MotionButton>
            </MotionFlex>

            <MotionFlex
              variants={fadeUp}
              alignItems={"center"}
              gap={5}
              flexWrap={"wrap"}
            >
              <AvatarGroup size={"sm"} max={5}>
                {[
                  { n: "Aisha", c: "#6440fb" },
                  { n: "Ben", c: "#1A064F" },
                  { n: "Chen", c: "#0ea5e9" },
                  { n: "Diego", c: "#f59e0b" },
                  { n: "Ella", c: "#10b981" },
                ].map((a, i) => (
                  <motion.div
                    key={a.n}
                    initial={{ opacity: 0, scale: 0.4, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.08,
                      type: "spring",
                      stiffness: 240,
                      damping: 16,
                    }}
                  >
                    <Avatar name={a.n} bg={a.c} color={"white"} />
                  </motion.div>
                ))}
              </AvatarGroup>
              <Box>
                <HStack spacing={1} mb={1}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -120 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        delay: 1.0 + i * 0.07,
                        type: "spring",
                        stiffness: 260,
                        damping: 14,
                      }}
                      style={{ display: "inline-flex" }}
                    >
                      <Icon as={AiFillStar} color={"#f59e0b"} />
                    </motion.div>
                  ))}
                  <Text
                    fontWeight={700}
                    color={"#140342"}
                    fontSize={"sm"}
                    ml={1}
                  >
                    4.9
                  </Text>
                </HStack>
                <Text fontSize={"sm"} color={"gray.600"}>
                  Trusted by 17M+ learners worldwide
                </Text>
              </Box>
            </MotionFlex>
          </Box>

          <MotionBox
            ref={heroWrapRef}
            onMouseMove={onHeroMove}
            onMouseLeave={onHeroLeave}
            flex={1}
            maxW={{ lg: "560px" }}
            position={"relative"}
            w={"100%"}
            style={{ perspective: 1200 }}
            variants={fadeUp}
          >
            <MotionBox
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              position={"relative"}
            >
              <MotionBox
                position={"absolute"}
                inset={0}
                borderRadius={"30px"}
                bgGradient={"linear(to-br, rgba(100,64,251,0.18), rgba(26,6,79,0.12))"}
                animate={{ rotate: [-3, -1, -3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                zIndex={0}
              />
              <MotionImage
                src={heroImg}
                alt={"Developers learning together"}
                position={"relative"}
                zIndex={1}
                maxW={"100%"}
              />

              <MotionBox
                position={"absolute"}
                top={"8%"}
                left={"-6%"}
                bg={"white"}
                px={4}
                py={3}
                borderRadius={"14px"}
                boxShadow={"0 14px 30px rgba(20,3,66,0.12)"}
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 180, damping: 16 }}
                whileHover={{ y: -4 }}
                zIndex={2}
              >
                <Flex align={"center"} gap={2}>
                  <Box w={"8px"} h={"8px"} borderRadius={"full"} bg={"#10b981"} />
                  <Text fontSize={"xs"} fontWeight={600} color={"#140342"}>
                    1,284 learning now
                  </Text>
                </Flex>
              </MotionBox>

              <MotionBox
                position={"absolute"}
                bottom={"10%"}
                right={"-6%"}
                bg={"white"}
                px={4}
                py={3}
                borderRadius={"14px"}
                boxShadow={"0 14px 30px rgba(20,3,66,0.12)"}
                initial={{ opacity: 0, x: 30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 180, damping: 16 }}
                whileHover={{ y: -4 }}
                zIndex={2}
              >
                <Flex align={"center"} gap={2}>
                  <Icon as={AiFillStar} color={"#f59e0b"} />
                  <Text fontSize={"xs"} fontWeight={600} color={"#140342"}>
                    Certificate earned
                  </Text>
                </Flex>
              </MotionBox>
            </MotionBox>
          </MotionBox>
        </MotionFlex>

        <MotionBox
          mt={{ base: 12, md: 16 }}
          p={{ base: 6, md: 8 }}
          borderRadius={"20px"}
          bg={"white"}
          boxShadow={"0 10px 40px rgba(20,3,66,0.06)"}
          border={"1px solid"}
          borderColor={"blackAlpha.50"}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(20,3,66,0.10)" }}
        >
          <MotionFlex
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={6}
            variants={stagger(0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true }}
          >
            {stats.map((s) => (
              <MotionBox
                key={s.label}
                flex={{ base: "1 1 45%", md: "1" }}
                variants={popIn}
              >
                <Heading
                  as={"h3"}
                  fontSize={{ base: "26px", md: "32px" }}
                  color={"#140342"}
                >
                  <AnimatedCount
                    to={s.value}
                    suffix={s.suffix}
                    prefix={s.prefix || ""}
                    duration={s.decimal ? 1.2 : 1.8}
                  />
                </Heading>
                <Text color={"gray.500"} fontSize={"sm"} mt={1}>
                  {s.label}
                </Text>
              </MotionBox>
            ))}
          </MotionFlex>
        </MotionBox>
      </Stack>
    </Box>
  );
};
