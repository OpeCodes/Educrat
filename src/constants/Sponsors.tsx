import { Stack, Box, Image, Grid } from "@chakra-ui/react";
import {
  sponsor1,
  sponsor2,
  sponsor3,
  sponsor4,
  sponsor5,
  sponsor6,
} from "../assets/export";

export const Sponsors = () => {
  return (
    <Box
      as={"section"}
      bg={"#f5f7fe"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={8}
      my={6}
    >
      <Stack>
        <Grid
          templateColumns={{ base: "repeat(3,1fr)", lg: "repeat(6,1fr)" }}
          alignItems={"center"}
        >
          <Box p={4}>
            <Image src={sponsor1} alt="amazon" />
          </Box>
          <Box p={4}>
            <Image src={sponsor2} alt="amd" />
          </Box>
          <Box p={4}>
            <Image src={sponsor3} alt="cisco" />
          </Box>
          <Box p={4}>
            <Image src={sponsor4} alt="drop-cam" />
          </Box>
          <Box p={4}>
            <Image src={sponsor5} alt="logitech" />
          </Box>
          <Box p={4}>
            <Image src={sponsor6} alt="spotify" />
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};
