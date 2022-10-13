import { Box, Flex, Heading, Link } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" align="center">
      <Flex direction="column">
        <Heading as="h1" size={["xl", "xl", "xl"]}>
          <Link href="/">Singles MTG</Link>
        </Heading>
        <Heading as="h2" size={["xs", "xs", "md"]}>
          <Link
            href="https://dragonslair.se/"
            isExternal
            rel="noopener noreferrer"
          >
            <u>Dragonslair.se</u>
          </Link>{" "}
          stock and prices.
        </Heading>
      </Flex>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
