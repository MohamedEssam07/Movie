// @ts-nocheck
import { Button, HStack, Text, Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionButton = motion(Button);


const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <MotionButton
      onClick={onClick}
      position="absolute"
      top="10px"
      left="25px"
      bgGradient="linear(to-r, blue.400, blue.600)"
      _hover={{
        bgGradient: "linear(to-r, blue.500, blue.700)",
        transform: "scale(1.05)",
        boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)"
      }}
      backdropFilter="blur(6px)"
      color="white"
      borderRadius="full"
      overflow="hidden"
      h="40px"
      px={2}
      initial={{ width: "40px" }}
      whileHover={{ width: "110px", backgroundColor: "rgba(50, 50, 50, 0.8)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"

      zIndex={1000}
    >
      <Icon as={ArrowBackIcon} boxSize={5} />
      <MotionText
        ml={3}
        fontWeight="medium"
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Back
      </MotionText>
    </MotionButton>
  );
};

const MotionText = motion(Text);

export default BackButton;
