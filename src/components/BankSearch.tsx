import React, { useState } from "react";
import { Input, Box, Text, Stack, Flex } from "@chakra-ui/react";
import { useGetAllBanks, useValidateAccountInfo } from "../hooks/instructor";

interface Bank {
  id: number;
  name: string;
}

const BankSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [accountNumber, setAccountNumber] = useState<any>("");
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [account_number, setAccount_number] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (bankDetails: Bank) => {
    setSelectedBank(bankDetails.name);
    setSearchQuery(bankDetails.name);
    setIsDropdownOpen(false);
  };

  const { getAllBanks } = useGetAllBanks(searchQuery);

  const { validateAccountInfo, isSuccess } = useValidateAccountInfo(
    accountDetails?.code,
    accountNumber
  );
  console.log(validateAccountInfo, "validateAccountInfo");
  return (
    <Stack rowGap={1}>
      <Stack>
        <Input
          placeholder="Search bank names"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="filled"
          w={{ md: "35%" }}
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
                    onClick={() => {
                      setAccountDetails(bank);
                      handleOptionClick(bank);
                    }}
                  >
                    {bank.name}
                  </Text>
                ))}
          </Box>
        )}
      </Stack>
      <>
        {selectedBank && (
          <>
            <Text mt={1}>
              Selected Bank: <strong>{selectedBank}</strong>
            </Text>
            <Flex
              width={"100%"}
              columnGap={5}
              mt={4}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Stack width={"100%"}>
                <Text>Enter Account Number</Text>
                <Input
                  placeholder="Enter 10 digits account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  variant="filled"
                  width={"100%"}
                  as={"input"}
                  type="number"
                  color={"black"}
                />
              </Stack>
              <Stack width={"100%"}>
                <Text>Available Balance</Text>
                <Input
                  placeholder="N0"
                  value={"N10"}
                  variant="filled"
                  width={"100%"}
                />
              </Stack>
            </Flex>
            {isSuccess && (
              <Flex
                width={"100%"}
                columnGap={5}
                mt={4}
                flexDirection={{ base: "column", md: "row" }}
              >
                <Stack width={"100%"}>
                  <Text>Account Name</Text>
                  <Text>{validateAccountInfo?.account_name}</Text>
                </Stack>
                <Stack width={"100%"}>
                  <Text>Amount</Text>
                  <Input
                    placeholder="Enter Amount"
                    variant="filled"
                    width={"100%"}
                    value={account_number}
                    onChange={(e) => setAccount_number(e.target.value)}
                  />
                </Stack>
              </Flex>
            )}
          </>
        )}
      </>
      <Stack></Stack>
    </Stack>
  );
};

export default BankSearch;
