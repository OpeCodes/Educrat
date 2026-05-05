import { Box, Image, Grid, Text } from "@chakra-ui/react";
import {
  sponsor1,
  sponsor2,
  sponsor3,
  sponsor4,
  sponsor5,
  sponsor6,
} from "../assets/export";
import { MotionBox, fadeUp, popIn, stagger } from "../components/motion";

const logos = [
  { src: sponsor1, alt: "amazon" },
  { src: sponsor2, alt: "amd" },
  { src: sponsor3, alt: "cisco" },
  { src: sponsor4, alt: "drop-cam" },
  { src: sponsor5, alt: "logitech" },
  { src: sponsor6, alt: "spotify" },
];

export const Sponsors = () => {
  return (
    <Box as={"section"} px={{ base: "6", md: "12", lg: "16" }} py={12}>
      <MotionBox
        variants={fadeUp}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Text
          textAlign={"center"}
          textTransform={"uppercase"}
          letterSpacing={"0.2em"}
          fontSize={"xs"}
          fontWeight={600}
          color={"gray.500"}
          mb={8}
        >
          Engineers from these teams learn on DevUpshot
        </Text>
      </MotionBox>
      <MotionBox
        variants={stagger(0.08)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Grid
          templateColumns={{ base: "repeat(3,1fr)", lg: "repeat(6,1fr)" }}
          alignItems={"center"}
          rowGap={6}
        >
          {logos.map(({ src, alt }) => (
            <MotionBox
              key={alt}
              variants={popIn}
              p={4}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              opacity={0.55}
              filter={"grayscale(100%)"}
              whileHover={{
                opacity: 1,
                filter: "grayscale(0%)",
                scale: 1.08,
                y: -4,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Image src={src} alt={alt} maxH={"36px"} />
            </MotionBox>
          ))}
        </Grid>
      </MotionBox>
    </Box>
  );
};
