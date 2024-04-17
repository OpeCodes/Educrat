import {
  Box,
  Heading,
  Text,
  Stack,
  Skeleton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Course, SliderButtons } from "../components/index";
import {  sliderSettings } from "../utils/data";
import { useGetCourse } from "../hooks/course";



export const Courses = () => {
  const { data, isPending } = useGetCourse();
  const dummyArray = [1, 2, 3, 4];
  return (
    <Box
      as={"section"}
      position={"relative"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={16}
    >
      <Stack>
        <Box
          as={"div"}
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "start", lg: "center" }}
        >
          <Box mb={{ base: "10px" }}>
            <Heading as={"h1"} color={"#140342"} size={"xl"}>
              Explore Featured Courses
            </Heading>
            <Text as={"p"} color={"gray.600"} my={2}>
              10,000+ unique online course list designs
            </Text>
          </Box>
         
        </Box>
        {isPending && (
          <Stack>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {dummyArray.map((_, index) => (
                <GridItem w="100%" key={index}>
                  <Skeleton height="200px" />
                  <Skeleton height="80px" mt={1} />
                </GridItem>
              ))}
            </Grid>
          </Stack>
        )}

        <Box as="div" mt={8}>
          <Swiper {...sliderSettings}>
            {!isPending && <SliderButtons />}
            {data?.data?.map((course: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Course key={course.id} {...course}  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Stack>
    </Box>
  );
};
