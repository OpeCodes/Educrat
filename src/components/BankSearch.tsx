import React, { useRef, useState } from "react";
import {
  Input,
  Box,
  Text,
  Stack,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Spinner,
} from "@chakra-ui/react";
import { useGetAllBanks, useGetUserWallet, useValidateAccountInfo } from "../hooks/instructor";
import { useVerifyUserPassword,  } from "../hooks/withdrawal";
import { setAccountBankDetails } from "../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
  const [amount, setAmount] = useState<string>("");
  const { walletLoading } = useSelector((store: RootState) => store?.user);

  const [password, setPassword] = useState("");
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const {
    verifyUserPassword,
    verifyUserPasswordLoading,
    isOpen,
    onOpen,
    onClose,
  } = useVerifyUserPassword();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (bankDetails: Bank) => {
    setSelectedBank(bankDetails.name);
    setSearchQuery(bankDetails.name);
    setIsDropdownOpen(false);
  };

  const { getAllBanks ,isPending: getAllBanksLoading} = useGetAllBanks(searchQuery);
  const { validateAccountInfo,  isPending } = useValidateAccountInfo(
    accountDetails?.code,
    accountNumber
  );
  const { getUserWallet } = useGetUserWallet();

  const AcountWithdrawDetails = {
    amount: Number(amount),
    account_number: validateAccountInfo?.account_number,
    account_name: validateAccountInfo?.account_name,
    bank_code: accountDetails?.code,
  };
 const dispatch= useDispatch();
  const inputHandler = (e: any) => {
    const { value } = e.target;
    if (String(value).length >= 10) {
      e.preventDefault();
      return;
    }
  };
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
      <Stack width={{ md: "35%" }} maxH={"200px"}  overflowY={"scroll"} >
        {isDropdownOpen && searchQuery && (
          <Box borderRadius="md">
            <Text mt={1}>
            {
              getAllBanksLoading && <Spinner/>
            }
            </Text>
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
              rowGap={2}
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
                  onKeyPress={inputHandler}
                />
              </Stack>
              <Stack width={"100%"}>
                <Text>Available Balance</Text>
                <Input
                  placeholder="N0"
                  value={getUserWallet?.balance}
                  variant="filled"
                  width={"100%"}
                />
              </Stack>
            </Flex>
            {accountNumber.length === 10 && (
              <>
                <Flex
                  width={"100%"}
                  columnGap={5}
                  rowGap={2}
                  mt={4}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Stack width={"100%"}>
                    <Text>Account Name</Text>
                    {accountNumber.length === 10 && isPending ? (
                      <Spinner />
                    ) : (
                      <Text>{validateAccountInfo?.account_name}</Text>
                    )}
                  </Stack>
                  <Stack width={"100%"}>
                    <Text>Amount</Text>
                    <Input
                      placeholder="Enter Amount"
                      variant="filled"
                      width={"100%"}
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Stack>
                </Flex>
                <Button
                  bg={"black"}
                  mr={3}
                  mt={4}
                  color={"white"}
                  width={"fit-content"}
                  onClick={() => {
                    onOpen();
                  }}
                  isLoading={walletLoading}
                  loadingText="Loading"
                  spinnerPlacement="end"

                  isDisabled={
                    !accountNumber ||
                    !amount ||
                    !validateAccountInfo?.account_name
                  }
                >
                  Withdraw Money
                </Button>
              </>
            )}
          </>
        )}
      </>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align={"center"}>
              <Text>Enter your password to Withdraw</Text>
              <ModalCloseButton mt={2.5} />
            </Flex>
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"black"}
              color={"white"}
              mr={3}
              spinnerPlacement="end"
              isLoading={verifyUserPasswordLoading}
              onClick={() => {
                if (!password) return;
                verifyUserPassword({ password });
                dispatch(setAccountBankDetails(AcountWithdrawDetails))        
              }}
            >
              OK
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default BankSearch;
