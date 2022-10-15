import { Flex, Link } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

type Props = {
  href: string;
  label: string;
  isExternal?: boolean;
  mobile?: boolean;
};

const LinksMTG = ({ href, label, isExternal, mobile = false }: Props) => {
  return (
    <Link
      display="flex"
      gap={2}
      justifyContent={mobile ? "space-between" : "start"}
      href={`https://dragonslair.se${href}`}
      isExternal={isExternal}
      rel="noopener noreferrer"
    >
      <u>{label}</u>
      {isExternal && (
        <Flex
          w={12}
          mt={mobile ? "5px" : "2px"}
          justifyContent={mobile ? "center" : "start"}
        >
          <BiLinkExternal />
        </Flex>
      )}
    </Link>
  );
};

export default LinksMTG;
