import { Flex, Stack, Text } from '@chakra-ui/react'
import { TbInfoHexagonFilled } from 'react-icons/tb'

const GetToastErrorHandling = ({error,onClose}: any) => {
  return (
    <Stack bg={"#FCBCA0"} py={3} px={4}>
    <Flex align={"center"} columnGap={2}>
      <Text>
        <TbInfoHexagonFilled size={30} />
      </Text>
      <Text fontWeight={"bold"}>Error fetching data</Text>
    </Flex>
    <Text fontWeight={"bold"}>{error}</Text>
    <Flex columnGap={3} mt={4}>
      <Text
        as={"button"}
        fontWeight={"bold"}
        onClick={() => window.location.reload()}
        color={"white"}
        py={1}
        px={4}
        backgroundColor={"black"}
      >
        Reload page
      </Text>
      <Text as={"button"} fontWeight={"bold"} onClick={onClose}>
        Dismiss
      </Text>
    </Flex>
  </Stack>
  )
}

export default GetToastErrorHandling