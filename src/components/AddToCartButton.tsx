import { Badge, Box, Text } from '@chakra-ui/react'
import { IoCartOutline } from 'react-icons/io5'

const AddToCartButton = () => {
  return (
    <Box position="relative">
    <Text cursor={"pointer"}>
      <IoCartOutline color={"#6440fb"} fontSize={"25px"} />
    </Text>
    <Badge
      position="absolute"
      top="-3"
      right="-2"
      borderRadius="50%"
      bg="red"
      color="white"
      padding={2}
      fontSize="xs"
      lineHeight="none"
      width="1.0rem"
      height="1.0rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      1
    </Badge>
  </Box>
  )
}

export default AddToCartButton