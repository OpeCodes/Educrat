import React, { useState } from 'react';
import { Input, VStack, Box, Text } from '@chakra-ui/react';

// Sample array of bank objects
const bankNames = [
  { id: 1, name: 'Bank of America' },
  { id: 2, name: 'Wells Fargo' },
  { id: 3, name: 'Chase Bank' },
  { id: 4, name: 'Citibank' },
  { id: 5, name: 'HSBC' },
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
    <VStack spacing={4}>
      <Input
        placeholder="Search bank names"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {isDropdownOpen && searchQuery && (
        <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={2}>
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
      {selectedBank && (
        <Text mt={2}>
          Selected Bank: <strong>{selectedBank}</strong>
        </Text>
      )}
    </VStack>
  );
};

export default BankSearch;






