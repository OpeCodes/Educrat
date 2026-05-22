import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/logo-2.svg";

const CertificationPage = () => {
  return (
    <Flex
      minH="100vh"
      px={{ base: 5, md: 10, lg: 16 }}
      py={{ base: 8, md: 12 }}
      align="center"
      justify="center"
      bg="linear-gradient(180deg, #f7f6ff 0%, #ffffff 40%, #f5f3ff 100%)"
    >
      <Box
        bg="white"
        borderRadius="32px"
        border="1px solid rgba(20,3,66,0.08)"
        boxShadow="0 26px 70px rgba(20,3,66,0.12)"
        w="full"
        maxW="1100px"
        p={{ base: 6, md: 10 }}
      >
        <Stack spacing={8}>
          <Flex justify="space-between" align={{ base: "start", md: "center" }} gap={6} wrap="wrap">
            <Image src={logo} alt="logo" h={{ base: "36px", md: "44px" }} />
            <Stack spacing={1} fontSize="xs" color="#4f547b" textAlign={{ base: "left", md: "right" }}>
              <Text>Certificate no: 10-0437-0834-03984-a237903275-20</Text>
              <Text>Certificate url: devupshot.com/certificate/00005</Text>
              <Text>Reference number: 00005</Text>
            </Stack>
          </Flex>

          <Divider />

          <Stack spacing={5} textAlign="center" py={{ base: 4, md: 8 }}>
            <Text
              textTransform="uppercase"
              letterSpacing="0.2em"
              fontWeight={700}
              color="#6440fb"
              fontSize="sm"
            >
              Certificate of Completion
            </Text>
            <Text fontSize={{ base: "2.4rem", md: "4rem" }} fontWeight={700} color="#140342" lineHeight={1}>
              Learn frontend development from Peter
            </Text>
            <Text color="#4f547b" fontSize={{ base: "md", md: "lg" }}>
              Presented to
            </Text>
            <Text fontSize={{ base: "2rem", md: "3rem" }} fontWeight={700} color="#140342">
              John Doe
            </Text>
            <Text color="#4f547b" maxW="680px" mx="auto">
              For successfully completing the full course and demonstrating practical understanding across the required lessons and projects.
            </Text>
          </Stack>

          <Grid templateColumns={{ base: "1fr", md: "1.2fr 0.8fr" }} gap={8} alignItems="end">
            <GridItem>
              <Stack spacing={2}>
                <Text color="#4f547b" fontSize="sm">
                  Instructor
                </Text>
                <Text fontWeight={700} color="#140342" fontSize="xl">
                  Peter Adedokun
                </Text>
                <Text color="#4f547b">
                  DevUpshot
                </Text>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack spacing={2}>
                <Flex justify="space-between" gap={5}>
                  <Text color="#4f547b">Date</Text>
                  <Text fontWeight={700} color="#140342">
                    May 17, 2023
                  </Text>
                </Flex>
                <Flex justify="space-between" gap={5}>
                  <Text color="#4f547b">Length</Text>
                  <Text fontWeight={700} color="#140342">
                    74.5 total hours
                  </Text>
                </Flex>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      </Box>
    </Flex>
  );
};

export default CertificationPage;
