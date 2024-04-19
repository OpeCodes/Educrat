import {
    Badge,
    Box,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverFooter
  } from "@chakra-ui/react";
  import { IoCartOutline } from "react-icons/io5";
  
  const AddToCartButton = () => {
    return (
      <>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Box position="relative" as={"button"}>
              <Text cursor="pointer">
                <IoCartOutline color="#6440fb" fontSize="25px" />
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
          </PopoverTrigger>
          <PopoverContent
            color="black"
            borderWidth={0} 
            shadow={"base"}
            zIndex={90000000}
          >
            <PopoverBody>
              Are you sure you want to have that milkshake?
            </PopoverBody>
            <PopoverFooter>This is the footer</PopoverFooter>
          </PopoverContent>
        </Popover>
      </>
    );
  };
  
  export default AddToCartButton;
  