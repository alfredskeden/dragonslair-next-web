import { Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

type Props = {
  href: string;
  label: string;
  isExternal?: boolean;
  mobile?: boolean;
};

const LinksMTG = ({ href, label, isExternal, mobile = false }: Props) => {
  return (
    <Tooltip label={<Text>{label}</Text>}>
      <Link
        display="flex"
        gap={2}
        justifyContent={mobile ? "space-between" : "start"}
        href={`https://dragonslair.se${href}`}
        isExternal={isExternal}
        rel="noopener noreferrer"
      >
        <Text
          whiteSpace={["inherit", "inherit", "nowrap"]}
          overflow={["inherit", "inherit", "hidden"]}
          textOverflow={["inherit", "inherit", "ellipsis"]}
          maxWidth={["fit-content", "inherit", "200px"]}
        >
          <u>{label}</u>
        </Text>
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
    </Tooltip>
  );
};

export default LinksMTG;
