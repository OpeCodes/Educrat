import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";
import img from "../../assets/404.svg";

const Error = () => {
  const error: any = useRouteError();

  if (error?.status === 404) {
    return (
      <Flex
        minH="100vh"
        px={{ base: 5, md: 10, lg: 16 }}
        py={{ base: 10, md: 14 }}
        align="center"
        justify="center"
      >
        <Flex
          className="surface-card"
          borderRadius="32px"
          p={{ base: 6, md: 10 }}
          columnGap={12}
          rowGap={8}
          flexDirection={{ base: "column", lg: "row" }}
          align="center"
          maxW="1200px"
          w="full"
        >
          <Image src={img} alt={"404 img"} maxW={{ base: "100%", lg: "480px" }} />
          <Stack spacing={4} maxW="460px">
            <Text
              textTransform="uppercase"
              letterSpacing="0.16em"
              fontWeight={700}
              fontSize="xs"
              color="#6440fb"
            >
              Error 404
            </Text>
            <Text fontSize={{ base: "4rem", md: "6rem" }} fontWeight={"bold"} lineHeight={0.95}>
              <Text as="span" color={"#140342"}>40</Text>
              <Text as="span" color={"#6440FB"}>4</Text>
            </Text>
            <Text fontSize={{ base: "2rem", md: "2.6rem" }} fontWeight={"bold"} color="#140342" lineHeight={1.05}>
              Oops. It looks like you are lost.
            </Text>
            <Text color="#4f547b" fontSize="lg">
              The page you are looking for is not available right now. Head back home and keep exploring.
            </Text>
            <Button
              as={Link}
              to={"/"}
              bgGradient="linear(to-r, #6440fb, #8b5cf6)"
              color={"white"}
              width={"fit-content"}
              px={7}
              py={6}
              boxShadow="0 16px 32px rgba(100,64,251,0.24)"
              _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
            >
              Go back home
            </Button>
          </Stack>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" px={{ base: 5, md: 10 }} align="center" justify="center">
      <Box className="surface-card" borderRadius="28px" p={{ base: 6, md: 8 }} maxW="760px">
        <Stack spacing={4}>
          <Text fontSize="2xl" fontWeight={700} color="#140342">
            Something went wrong
          </Text>
          <Text color="#4f547b">
            A part of the app hit an unexpected issue. You can report it quickly and we will take a look.
          </Text>
          <Text
            as="a"
            href="mailto:devupshot@gmail.com?subject=Website%20Issue%20Report&body=Good%20day,%0A%0ASomething%20on%20your%20website%20appears%20to%20be%20broken.%20I%20wanted%20to%20bring%20this%20to%20your%20attention%20so%20it%20can%20be%20addressed%20appropriately.%0A%0APlease%20let%20me%20know%20if%20you%20need%20further%20information%20or%20assistance.%0A%0AThank%20you.%0A"
            color="#6440fb"
            fontWeight={700}
          >
            Report website issue
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Error;
