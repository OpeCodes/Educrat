import { Box, Heading, Text, Flex, Grid, Image } from "@chakra-ui/react";
import { ctaData } from "../utils/data";
import {
  MotionBox,
  fadeUp,
  popIn,
  slideLeft,
  stagger,
} from "../components/motion";

type Info = {
  id: number;
  img: string;
  title: string;
  desc: string;
};

export const Cta = () => {
  return (
    <Box
      as={"section"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={{ base: 14, md: 20 }}
    >
      <MotionBox
        variants={stagger(0.1)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          mb={12}
        >
          <MotionBox variants={slideLeft}>
            <Text
              color={"#6440fb"}
              fontWeight={700}
              textTransform={"uppercase"}
              letterSpacing={"0.15em"}
              fontSize={"sm"}
              mb={3}
            >
              Why DevUpshot
            </Text>
          </MotionBox>
          <MotionBox variants={fadeUp}>
            <Heading
              as={"h2"}
              color={"#140342"}
              fontSize={{ base: "30px", md: "40px" }}
              letterSpacing={"-0.02em"}
              lineHeight={1.15}
              maxW={"720px"}
            >
              Learning that translates to your next role — not just another
              certificate.
            </Heading>
          </MotionBox>
          <MotionBox variants={fadeUp}>
            <Text color={"gray.600"} mt={4} maxW={"560px"}>
              Everything we build is designed to move you from where you are to
              where you want to be in your engineering career.
            </Text>
          </MotionBox>
        </Flex>
      </MotionBox>

      <MotionBox
        variants={stagger(0.1)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={6}
        >
          {ctaData.map(({ id, img, title, desc }: Info, i: number) => (
            <MotionBox
              key={id}
              variants={popIn}
              whileHover={{
                y: -10,
                rotate: i % 2 === 0 ? -1.2 : 1.2,
                boxShadow: "0 22px 50px rgba(20,3,66,0.12)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              p={8}
              borderRadius={"20px"}
              bg={"white"}
              border={"1px solid"}
              borderColor={"blackAlpha.100"}
              cursor={"default"}
            >
              <MotionBox
                w={"56px"}
                h={"56px"}
                borderRadius={"14px"}
                bg={"#f4f1fe"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                mb={5}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Image src={img} alt={title} maxW={"32px"} />
              </MotionBox>
              <Heading
                as={"h3"}
                color={"#140342"}
                fontSize={"18px"}
                fontWeight={600}
                mb={2}
              >
                {title}
              </Heading>
              <Text color={"gray.600"} fontSize={"15px"} lineHeight={1.6}>
                {desc}
              </Text>
            </MotionBox>
          ))}
        </Grid>
      </MotionBox>
    </Box>
  );
};
