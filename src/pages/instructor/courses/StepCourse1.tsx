import { CreateCourseNavBar } from '../../../components'
import { Stack } from '@chakra-ui/react'

const StepCourse1 = () => {
  return (
    <Stack>
        <CreateCourseNavBar step={1} progressValue={50}/>
    </Stack>
  )
}

export default StepCourse1