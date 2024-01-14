import { CreateCourseNavBar } from '../../../components'
import { Stack } from '@chakra-ui/react'

const StepCourse1 = () => {
  return (
    <Stack>
        <CreateCourseNavBar step={1} progressValue={20}/>
    </Stack>
  )
}

export default StepCourse1