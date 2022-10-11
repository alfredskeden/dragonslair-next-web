import axios from "axios";
import {
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  useDisclosure,
  Spinner,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import dayjs from "dayjs";

type ItemProps = {
  name: string;
  hideOutOfStock: boolean;
  isMobile?: boolean;
};

type Product = {
  avail?: number;
  items?: Array<Items>;
  lowestHref?: string;
  lowestPrice?: number;
  name: string;
  totalSerches?: number;
  imageId?: string;
};

type Items = {
  name: string;
  itemsAvail: number;
  price: number;
  buyInPrice: number;
  RecentByStore: string;
  URL: string;
};

const Item = ({ name, hideOutOfStock, isMobile = false }: ItemProps) => {
  const [info, setInfo] = useState<Product>({ name });
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function getItemInfo() {
      const infoResponse = await axios.get(
        `/api/fetch-item?name=${name.split(" ").join("+")}`
      );

      const rows = infoResponse.data.response.rows
        .filter((x: any) => x.Tags.some((s: string) => s === "magic"))
        .sort(
          (a: { Popularity: number }, b: { Popularity: number }) =>
            a.Popularity - b.Popularity
        );

      const avail: number = rows.reduce((acc: number, row: any) => {
        acc += row.PrimaryAvailable;
        return acc;
      }, 0);

      const { url } = infoResponse.data.response;

      const parsedInfo: Product = {
        avail,
        lowestHref: url,
        lowestPrice: rows[0].Price,
        name: rows[0].Name,
        totalSerches: rows.length,
        imageId: rows[0].ImageId,
        items: rows.map((row: any) => {
          return {
            name: row.Name,
            itemsAvail: row.PrimaryAvailable,
            price: row.Price,
            buyInPrice: row.BuyinPrice,
            RecentByStore: row.RecentByStore["1"],
            URL: row.URL,
          };
        }),
      };
      setInfo(parsedInfo);
      setLoading(false);
    }
    getItemInfo();
  }, [name]);

  if (!loading && !info.avail && hideOutOfStock) return null;

  if (isMobile) {
    return (
      <>
        <Flex
          rounded="2xl"
          background="blackAlpha.100"
          paddingY={4}
          paddingX={6}
          justifyContent="space-between"
          gap={2}
        >
          <Flex flexDirection="column" width="50%">
            <Link
              href={`https://dragonslair.se${info.lowestHref}`}
              isExternal
              rel="noopener noreferrer"
            >
              <u>{info.name}</u>
            </Link>
            <Flex flexDirection="column" mt="auto" gap={2}>
              <Text color={!info.avail ? "red.300" : "green.300"}>
                {info.avail} pc
              </Text>
              <Button onClick={onOpen} variant="link" justifyContent="start">
                <u>
                  {!info.lowestPrice ? "Not set" : `~ ${info.lowestPrice} kr`}
                </u>
              </Button>
            </Flex>
          </Flex>
          <Flex width="50%">
            <Image
              src={`https://dragonslair.se/images/${info.imageId}/product`}
              alt={info.name}
              fallbackSrc="/image-not-found.png"
            />
          </Flex>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{info.name} info</ModalHeader>
            <Flex>// TODO TOMOORW IS TO FIX THIS MOBILE MODAL VIEW</Flex>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Tr>
        {loading ? (
          <>
            <Td />
            <Td />
            <Td>{name}</Td>
            <Td>
              <Spinner />
            </Td>
            <Td />
          </>
        ) : (
          <>
            <Td>({info.totalSerches})</Td>
            <Td>
              <Tooltip
                placement="auto"
                hasArrow
                label={
                  <Image
                    src={`https://dragonslair.se/images/${info.imageId}/product`}
                    alt={info.name}
                    boxSize="400px"
                    fallbackSrc="/image-not-found.png"
                  />
                }
              >
                <Flex>
                  <AiOutlineCamera />
                </Flex>
              </Tooltip>
            </Td>
            <Td>
              <Link
                href={`https://dragonslair.se${info.lowestHref}`}
                isExternal
                rel="noopener noreferrer"
              >
                <u>{info.name}</u>
              </Link>
            </Td>
            <Td textAlign="center">
              <Text color={!info.avail ? "red.300" : "green.300"}>
                {info.avail}
              </Text>
            </Td>
            <Td textAlign="center">
              <Button onClick={onOpen} variant="link">
                <u>
                  {!info.lowestPrice ? "Not set" : `~ ${info.lowestPrice} kr`}
                </u>
              </Button>
            </Td>
          </>
        )}
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{info.name} info</ModalHeader>
          <TableContainer>
            <Table variant="striped" colorScheme="black">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Stock</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Buy Price</Th>
                  <Th>Recent in store</Th>
                </Tr>
              </Thead>
              <Tbody>
                {info.items?.map((item) => {
                  return (
                    <Tr>
                      <Td>
                        <Link
                          href={`https://dragonslair.se${item.URL}`}
                          isExternal
                          rel="noopener noreferrer"
                        >
                          <u>{item.name}</u>
                        </Link>
                      </Td>
                      <Td isNumeric>
                        <Text
                          color={!item.itemsAvail ? "red.300" : "green.300"}
                        >
                          {item.itemsAvail}
                        </Text>
                      </Td>
                      <Td isNumeric>{item.price ?? 0}</Td>
                      <Td isNumeric>{item.buyInPrice}</Td>
                      <Td>{dayjs(item.RecentByStore).format("YYYY-MMM-DD")}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Item;
