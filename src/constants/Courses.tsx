import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Skeleton,
  Grid,
  GridItem,
  Avatar,
  Flex,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Course, SliderButtons } from "../components/index";
// import { SliderButtons, Course } from "../components/index";
import { buttonsData, sliderSettings } from "../utils/data";
import { useGetCourse } from "../hooks/course";
import { CiPlay1, CiClock1 } from "react-icons/ci";
import { icon3 } from "../assets/export";
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

type button = {
  id: number;
  name: string;
};

export const Courses = () => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };
  // const { data } = useGetUser();
  // const {getLectureModuleCourse,isPending} = useGetAllInstructorCourses(data?.id);
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
          <Box display={"flex"} w={{ base: "90vw", md: "30vw" }}>
            {buttonsData.map(({ id, name }: button) => {
              return (
                <Button
                  variant={"solid"}
                  color={activeButton === id ? "#6440fb" : "#140342"}
                  bg={activeButton === id ? "#f4f1fe" : "white"}
                  borderRadius={"full"}
                  p={5}
                  mx={{ md: 2 }}
                  fontWeight={"normal"}
                  isActive={activeButton === id}
                  onClick={() => handleButtonClick(id)}
                  key={id}
                >
                  {name}
                </Button>
              );
            })}
          </Box>
        </Box>
        {isPending && (
          <Stack>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
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
                  <Course key={course.id} {...course} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Stack>
    </Box>
  );
};
