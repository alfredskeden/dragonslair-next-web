import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center" mt="auto">
      <Text fontSize="sm" color="gray.500">
        {new Date().getFullYear()} -{" "}
        <Link
          href="https://github.com/alfredskeden"
          isExternal
          rel="noopener noreferrer"
        >
          alfredskeden
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
