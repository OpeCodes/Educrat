import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Avatar,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi";
import logo from "../../assets/devupshotLogo.png";
import {
  MotionBox,
  MotionFlex,
  fadeUp,
  popIn,
  stagger,
  orbDrift,
} from "../../components/motion";
import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

const stats = [
  { value: "17M+", label: "learners" },
  { value: "1,200+", label: "courses" },
  { value: "4.9★", label: "rating" },
];

export const AuthShell = ({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      minH={"100vh"}
      bg={"#fbfaff"}
    >
      <GridItem
        position={"relative"}
        display={{ base: "none", lg: "flex" }}
        flexDir={"column"}
        justifyContent={"space-between"}
        p={12}
        overflow={"hidden"}
        bgGradient={"linear(135deg, #1A064F 0%, #2d0b8a 50%, #6440fb 100%)"}
        color={"white"}
        h={"100vh"}
        sx={{ position: "sticky", top: 0 }}
      >
        <MotionBox
          position={"absolute"}
          top={"-140px"}
          right={"-140px"}
          w={"420px"}
          h={"420px"}
          borderRadius={"full"}
          bg={"#a78bfa"}
          opacity={0.25}
          filter={"blur(80px)"}
          {...orbDrift(0)}
        />
        <MotionBox
          position={"absolute"}
          bottom={"-160px"}
          left={"-100px"}
          w={"380px"}
          h={"380px"}
          borderRadius={"full"}
          bg={"#0ea5e9"}
          opacity={0.18}
          filter={"blur(90px)"}
          {...orbDrift(2)}
        />
        <MotionBox
          position={"absolute"}
          top={"40%"}
          left={"30%"}
          w={"260px"}
          h={"260px"}
          borderRadius={"full"}
          bg={"#f59e0b"}
          opacity={0.12}
          filter={"blur(70px)"}
          {...orbDrift(4)}
        />

        <Box
          position={"absolute"}
          inset={0}
          opacity={0.08}
          backgroundImage={
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)"
          }
          backgroundSize={"22px 22px"}
        />

        <MotionBox
          position={"relative"}
          zIndex={1}
          cursor={"pointer"}
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -4 }}
        >
          <Image src={logo} h={"32px"} filter={"brightness(0) invert(1)"} />
        </MotionBox>

        <MotionFlex
          position={"relative"}
          zIndex={1}
          flexDir={"column"}
          gap={10}
          variants={stagger(0.15, 0.2)}
          initial={"hidden"}
          animate={"show"}
        >
          <MotionBox variants={fadeUp}>
            <HStack
              spacing={2}
              bg={"whiteAlpha.150"}
              border={"1px solid"}
              borderColor={"whiteAlpha.300"}
              borderRadius={"full"}
              px={4}
              py={2}
              w={"fit-content"}
              backdropFilter={"blur(10px)"}
            >
              <motion.span
                animate={{ rotate: [0, 12, -8, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-flex" }}
              >
                <Icon as={HiSparkles} color={"#fde68a"} />
              </motion.span>
              <Text fontSize={"sm"} fontWeight={600}>
                Project-based learning for engineers
              </Text>
            </HStack>
          </MotionBox>

          <MotionBox variants={fadeUp}>
            <Heading
              as={"h2"}
              fontSize={{ lg: "44px", xl: "52px" }}
              lineHeight={1.05}
              letterSpacing={"-0.025em"}
              maxW={"500px"}
            >
              Where developers
              <br />
              <Box
                as={"span"}
                bgGradient={"linear(to-r, #fde68a, #ffffff)"}
                bgClip={"text"}
              >
                actually level up.
              </Box>
            </Heading>
            <Text
              mt={5}
              color={"whiteAlpha.800"}
              fontSize={"md"}
              maxW={"460px"}
              lineHeight={1.6}
            >
              Senior engineer mentors, project-based tracks, and verified
              certificates — built for the career you actually want.
            </Text>
          </MotionBox>

          <MotionBox
            variants={popIn}
            p={6}
            borderRadius={"20px"}
            bg={"whiteAlpha.150"}
            border={"1px solid"}
            borderColor={"whiteAlpha.250"}
            backdropFilter={"blur(10px)"}
            maxW={"460px"}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.45)" }}
          >
            <HStack spacing={1} mb={3}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -120 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.07,
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  }}
                  style={{ display: "inline-flex" }}
                >
                  <Icon as={AiFillStar} color={"#fde68a"} />
                </motion.div>
              ))}
            </HStack>
            <Text fontSize={"md"} lineHeight={1.6} fontStyle={"italic"}>
              "Six weeks in and I already shipped two production projects. The
              mentor reviews are unreal — DevUpshot is the closest thing to a
              real senior engineer over your shoulder."
            </Text>
            <HStack mt={4} spacing={3}>
              <Avatar size={"sm"} name={"Maya Okonkwo"} bg={"#a78bfa"} />
              <Box>
                <Text fontSize={"sm"} fontWeight={600}>
                  Maya Okonkwo
                </Text>
                <Text fontSize={"xs"} color={"whiteAlpha.700"}>
                  Frontend Engineer · Lagos
                </Text>
              </Box>
            </HStack>
          </MotionBox>
        </MotionFlex>

        <MotionFlex
          position={"relative"}
          zIndex={1}
          gap={10}
          variants={stagger(0.1, 0.6)}
          initial={"hidden"}
          animate={"show"}
        >
          {stats.map((s) => (
            <MotionBox key={s.label} variants={popIn}>
              <Heading as={"h4"} fontSize={"28px"} letterSpacing={"-0.02em"}>
                {s.value}
              </Heading>
              <Text fontSize={"sm"} color={"whiteAlpha.700"} mt={1}>
                {s.label}
              </Text>
            </MotionBox>
          ))}
        </MotionFlex>
      </GridItem>

      <GridItem
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={{ base: 5, sm: 8, lg: 12 }}
        py={{ base: 8, lg: 12 }}
        position={"relative"}
        bgGradient={
          "linear(180deg, #fbfaff 0%, #ffffff 50%, #f5f3ff 100%)"
        }
      >
        <MotionBox
          position={"absolute"}
          top={"-100px"}
          right={"-100px"}
          w={"260px"}
          h={"260px"}
          borderRadius={"full"}
          bg={"#6440fb"}
          opacity={0.06}
          filter={"blur(70px)"}
          display={{ base: "none", lg: "block" }}
          {...orbDrift(1)}
        />

        <MotionBox
          display={{ base: "block", lg: "none" }}
          mb={6}
          cursor={"pointer"}
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Text fontSize={"1.7rem"} fontWeight={"bold"} color={"#6440fb"}>
            DevUpshot
          </Text>
        </MotionBox>

        <MotionBox
          w={"100%"}
          maxW={"480px"}
          position={"relative"}
          zIndex={1}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            bg={"white"}
            borderRadius={"24px"}
            border={"1px solid"}
            borderColor={"blackAlpha.100"}
            boxShadow={"0 20px 60px rgba(20,3,66,0.08)"}
            p={{ base: 6, sm: 10 }}
          >
            <Box textAlign={"center"} mb={8}>
              {eyebrow && (
                <Text
                  color={"#6440fb"}
                  fontWeight={700}
                  textTransform={"uppercase"}
                  letterSpacing={"0.15em"}
                  fontSize={"xs"}
                  mb={3}
                >
                  {eyebrow}
                </Text>
              )}
              <Heading
                as={"h1"}
                color={"#140342"}
                fontSize={{ base: "28px", sm: "32px" }}
                letterSpacing={"-0.02em"}
              >
                {title}
              </Heading>
              {subtitle && (
                <Text color={"gray.600"} mt={2} fontSize={"15px"}>
                  {subtitle}
                </Text>
              )}
            </Box>
            {children}
          </Box>
          {footer && (
            <Flex
              mt={6}
              justify={"center"}
              align={"center"}
              gap={1}
              color={"gray.700"}
              fontSize={"sm"}
            >
              {footer}
            </Flex>
          )}
        </MotionBox>
      </GridItem>
    </Grid>
  );
};

export const authInputStyles = {
  variant: "filled",
  bg: "#f4f1fe",
  border: "1px solid",
  borderColor: "transparent",
  borderRadius: "12px",
  py: 6,
  fontSize: "15px",
  _hover: { bg: "#ece6fd" },
  _focus: {
    bg: "white",
    borderColor: "#6440fb",
    boxShadow: "0 0 0 3px rgba(100,64,251,0.18)",
  },
  focusBorderColor: "transparent",
};

export const authLabelStyles = {
  fontSize: "sm",
  fontWeight: 600,
  color: "#140342",
  mb: 1.5,
};
