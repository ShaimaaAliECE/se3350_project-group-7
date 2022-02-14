import React from "react";
import { Box, useToast } from "@chakra-ui/react";
import Header, { Props as HeaderProps } from "@/components/Header";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";

export type Props = {
  headerProps?: HeaderProps;
};

const SortingGame: React.FC<Props> = ({ headerProps, children }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleOnIdle = () => {
    navigate("/");
    toast({
      title: "Sorry!",
      description: `You were idle for too long.`,
      status: "error",
      duration: 10000,
      isClosable: true,
    });
  };

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: handleOnIdle,
  });

  return (
    <Box>
      <Header {...headerProps} />
      {children}
    </Box>
  );
};

export default SortingGame;
