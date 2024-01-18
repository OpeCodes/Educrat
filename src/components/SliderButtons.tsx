import { Box } from "@chakra-ui/react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSwiper } from "swiper/react";

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <Box as="div" display={"flex"}>
      <Box
        position={"absolute"}
        top={{ base: "54%", lg: "58%" }}
        left={{ base: "1%", lg: "2.5%" }}
      >
        <BsFillArrowLeftCircleFill
          size={45}
          color={"#6440fb"}
          onClick={() => swiper.slidePrev()}
        />
      </Box>
      <Box
        position={"absolute"}
        top={{ base: "54%", lg: "58%" }}
        right={{ base: "1%", lg: "2.8%" }}
      >
        <BsFillArrowRightCircleFill
          size={45}
          color={"#6440fb"}
          onClick={() => swiper.slideNext()}
        />
      </Box>
    </Box>
  );
};

export default SliderButtons;
