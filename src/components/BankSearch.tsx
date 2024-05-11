import React, { useState } from "react";
import { Input,  Box, Text, Stack } from "@chakra-ui/react";
import { useGetAllBanks } from "../hooks/instructor";

interface Bank {
  id: number;
  name: string;
}

const BankSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (bankDetails: Bank) => {
    setSelectedBank(bankDetails.name);
    setSearchQuery(bankDetails.name);
    setIsDropdownOpen(false);
    console.log(bankDetails);
  };

  const { getAllBanks } = useGetAllBanks(searchQuery); // Pass searchQuery to the hook

  return (
    <Stack spacing={4}>
      <Stack>
        <Input
          placeholder="Search bank names"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="filled"
          w={{ md: "30%" }}
        />
      </Stack>
      <Stack width={{ md: "30%" }} maxH={"200px"} overflowY={"scroll"}>
        {isDropdownOpen && searchQuery && (
          <Box borderRadius="md">
            {getAllBanks &&
              getAllBanks
                .filter((bank: Bank) =>
                  bank.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((bank: Bank) => (
                  <Text
                    key={bank.id}
                    cursor="pointer"
                    _hover={{ bg: "gray.200" }}
                    onClick={() => handleOptionClick(bank)}
                  >
                    {bank.name}
                  </Text>
                ))}
          </Box>
        )}
      </Stack>
      {selectedBank && (
        <Text mt={2}>
          Selected Bank: <strong>{selectedBank}</strong>
        </Text>
      )}
    </Stack>
  );
};

export default BankSearch;
