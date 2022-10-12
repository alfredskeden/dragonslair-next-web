import {
  Flex,
  Td,
  Tfoot,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Checkbox,
  useMediaQuery,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState } from "react";
import HeaderText from "../../components/samples/HeaderText";
import TextArea from "../../components/samples/TextArea";
import Item from "../../components/samples/Item";
import InputField from "../../components/samples/InputField";

const headers = ["(rows)", "img", "Name", "Stock", "Price"];

const Home = () => {
  const [savedValue, setSavedValue] = useState<Array<string>>([]);
  const [hideOutOfStock, setHideOutOfStock] = useState<boolean>(false);
  const [isMobile] = useMediaQuery("(max-width: 669px)");

  const addSingleSearchValue = (text: string) => {
    setSavedValue((r) => [...r, text]);
  };

  return (
    <Flex direction="column" minHeight="80vh" gap={4}>
      <NextSeo title="Dragonslair mgt stock and price scanner" />
      <HeaderText />
      <InputField onSetValue={addSingleSearchValue} />
      <TextArea onSetValue={setSavedValue} />
      <Checkbox
        alignSelf="center"
        onChange={(value) => setHideOutOfStock(value.target.checked)}
      >
        Hide out of stock
      </Checkbox>
      {!isMobile ? (
        <TableContainer>
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                {headers.map((header, index) => {
                  return (
                    <Th key={`${header}-header-table`}>
                      {index === 0 ? savedValue.length : ""} {header}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {savedValue.length > 0 ? (
                savedValue.map((value) => {
                  if (!value) return null;
                  return (
                    <Item
                      name={value}
                      key={`${value}-item`}
                      hideOutOfStock={hideOutOfStock}
                    />
                  );
                })
              ) : (
                <Tr>
                  <Td />
                  <Td />
                  <Td>Please search for items above.</Td>
                  <Td />
                  <Td />
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                {headers.map((header) => {
                  return <Th key={`${header}-footer-table`}>{header}</Th>;
                })}
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : (
        <>
          {savedValue.length > 0 && savedValue[0] !== "" ? (
            savedValue.map((value) => {
              if (!value) return null;
              return (
                <Item
                  name={value}
                  key={`${value}-item-mobile`}
                  hideOutOfStock={hideOutOfStock}
                  isMobile={isMobile}
                />
              );
            })
          ) : (
            <Flex>Please search for items above.</Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default Home;
