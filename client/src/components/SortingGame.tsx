import React from "react";
import { Box } from "@chakra-ui/react";
import Header, { Props as HeaderProps } from "@/components/Header";

export type Props = {
  headerProps?: HeaderProps;
};

const SortingGame: React.FC<Props> = ({ headerProps, children }) => (
  <Box>
    <Header {...headerProps} />
    {children}
  </Box>
);

export default SortingGame;
