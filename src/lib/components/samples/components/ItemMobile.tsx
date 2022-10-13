/* eslint-disable react/jsx-no-undef */
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Link,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Product } from "../Item";
import ImagesMTG from "./ImagesMTG";

type Props = {
  product: Product;
};

const ItemMobile = ({ product }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, avail, lowestPrice, lowestHref, imageId } = product;

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
            href={`https://dragonslair.se${lowestHref}`}
            isExternal
            rel="noopener noreferrer"
          >
            <u>{name}</u>
          </Link>
          <Flex flexDirection="column" mt="auto" gap={2}>
            <Text color={!avail ? "red.300" : "green.300"}>{avail} pc</Text>
            <Button onClick={onOpen} variant="link" justifyContent="start">
              <u>{!lowestPrice ? "No price" : `~ ${lowestPrice} kr`}</u>
            </Button>
          </Flex>
        </Flex>
        <Flex width="50%" position="relative" rounded="full">
          <ImagesMTG name={name} imageId={imageId} />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} info</ModalHeader>
          <ModalCloseButton />
          <Flex flexDirection="column">
            {product.items?.map((item) => {
              return (
                <Flex key={item.id} padding={5}>
                  <Flex flexDirection="column" width="50%">
                    <Link
                      href={`https://dragonslair.se${item.URL}`}
                      isExternal
                      rel="noopener noreferrer"
                    >
                      <u>{item.name}</u>
                    </Link>
                    <Flex flexDirection="column" mt="auto" gap={2}>
                      <Text color={!item.itemsAvail ? "red.300" : "green.300"}>
                        {item.itemsAvail} pc
                      </Text>
                      <Text>Buy price: {item.buyInPrice} kr</Text>
                      <Text>
                        Price: {!item.price ? "Not set" : `~ ${item.price} kr`}
                      </Text>
                      <Text>
                        Last in:{" "}
                        {dayjs(item.RecentByStore).format("YYYY-MMM-DD")}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex width="50%" position="relative">
                    <ImagesMTG name={item.name} imageId={item.imageId} />
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemMobile;
