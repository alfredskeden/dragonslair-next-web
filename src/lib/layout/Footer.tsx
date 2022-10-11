import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center" mt="auto">
      <Text fontSize="sm" color="gray.500">
        <Link
          href="https://github.com/alfredskeden"
          isExternal
          rel="noopener noreferrer"
        >
          <u>{new Date().getFullYear()} - alfredskeden</u>
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
