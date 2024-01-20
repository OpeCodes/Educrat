import { CircularProgress, Flex } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Flex justify="center" mt={10}>
    <CircularProgress isIndeterminate color='#140342' size='90px' />
    </Flex>
  )
}

export default Loading