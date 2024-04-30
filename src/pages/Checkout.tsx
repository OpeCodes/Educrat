import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react"

const Checkout = () => {
  return (
    <Stack mt={"5rem"}>
    <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} columnGap={5}>
      
      <GridItem
        height="100vh"
        // mx={{ base: "15px", lg: "20px" }}
        justifyContent={"center"}
        alignContent={"center"}
        display={"flex"}
      >
        <Stack>
        <Text>Checkout</Text>
        <Text>Billing address</Text>
        </Stack>
      </GridItem>
      <GridItem w="100%">
        <Box
          boxSize="sm"
          w="50%"
          h="100vh"
          bg={"#140342"}
          display={{ base: "none", lg: "block" }}
          position={"fixed"}
        >
         
        </Box>
      </GridItem>
    </Grid>
  </Stack>
  )
}

export default Checkout