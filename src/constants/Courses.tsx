import { Box, Button, Heading, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { SliderButtons, Course } from "../components/index";
import { buttonsData, sliderSettings, coursesData } from "../utils/data";

type button = {
  id: number;
  name: string;
};

export const Courses = () => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };
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
          <Box display={"flex"}>
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
        <Box as="div" mt={8}>
          <Swiper {...sliderSettings}>
            <SliderButtons useSwiper={useSwiper} />
            {coursesData.map((course, index) => {
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
