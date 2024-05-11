import React, { useState } from 'react';
import { Input, VStack, Box, Text, Stack } from '@chakra-ui/react';

// Sample array of bank objects
const bankNames = [
  { id: 1, name: 'Bank of America' },
  { id: 2, name: 'Wells Fargo' },
  { id: 3, name: 'Chase Bank' },
  { id: 4, name: 'Citibank' },
  { id: 5, name: 'HSBC' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  { id: 6, name: 'TD Bank' },
  // Add more bank objects as needed
];

interface Bank {
  id: number;
  name: string;
}

const BankSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsDropdownOpen(true); 
  };

  const handleOptionClick = (name: string) => {
    setSelectedBank(name);
    setSearchQuery(name); 
    setIsDropdownOpen(false); 
  };

  return (
    <Stack spacing={4}>
      <Stack>

      <Input
        placeholder="Search bank names111"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="filled"
        w={"30%"}
      />
      </Stack>
    <Stack width={"30%"} maxH={"200px"} overflowY={"scroll"}>
      {isDropdownOpen && searchQuery && (
        <Box  borderRadius="md"  >
          {bankNames
            .filter((bank: Bank) =>
              bank.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((bank: Bank) => (
              <Text
                key={bank.id}
                cursor="pointer"
                _hover={{ bg: 'gray.200' }}
                onClick={() => handleOptionClick(bank.name)}
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






