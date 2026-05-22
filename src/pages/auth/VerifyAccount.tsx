import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVerifyAccount } from "../../hooks/auth";
import { Box, Flex, Spinner, Text, Icon, Stack } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { AuthShell } from "./AuthShell";
import { motion } from "framer-motion";

const VerifyAccount = () => {
  const { code, token } = useParams();
  const { verifyAccount, isPending } = useVerifyAccount();

  useEffect(() => {
    verifyAccount({ code, token });
  }, [code, token]);

  return (
    <AuthShell
      eyebrow={"Almost ready"}
      title={isPending ? "Verifying your account" : "You are all set"}
      subtitle={
        isPending
          ? "Hang tight while we confirm your email."
          : "Account verified. Redirecting you now..."
      }
    >
      <Flex flexDirection="column" align={"center"} justify={"center"} py={8}>
        {isPending ? (
          <Box position={"relative"}>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "9999px",
                background:
                  "radial-gradient(circle, rgba(100,64,251,0.35), transparent 70%)",
              }}
            />
            <Spinner
              thickness="4px"
              speed="0.7s"
              emptyColor="rgba(100,64,251,0.15)"
              color="#6440fb"
              boxSize={"56px"}
            />
          </Box>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            <Icon as={FiCheckCircle} color={"#10b981"} boxSize={"56px"} />
          </motion.div>
        )}
        <Stack mt={6} spacing={1} align="center">
          <Text color={"gray.600"} fontSize={"sm"}>
            {isPending ? "This usually takes just a moment." : "Welcome to DevUpshot."}
          </Text>
          {!isPending && (
            <Text color={"#140342"} fontSize={"sm"} fontWeight={600}>
              Your learning dashboard is almost ready.
            </Text>
          )}
        </Stack>
      </Flex>
    </AuthShell>
  );
};

export default VerifyAccount;
