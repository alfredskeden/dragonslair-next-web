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
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState } from "react";
import TextArea from "../../components/samples/TextArea";
import Item from "../../components/samples/Item";
import InputField from "../../components/samples/InputField";

type TableHeader = {
  label: string;
  isNumeric?: boolean;
};

const headers: Array<TableHeader> = [
  { label: "(rows)" },
  { label: "img" },
  { label: "Name" },
  { label: "Stock", isNumeric: true },
  { label: "Price", isNumeric: true },
];

const Home = () => {
  const [savedValue, setSavedValue] = useState<Array<string>>([]);
  const [hideOutOfStock, setHideOutOfStock] = useState<boolean>(false);
  const [isMobile] = useMediaQuery("(max-width: 669px)");

  const addSingleSearchValue = (text: string) => {
    setSavedValue((r) => [...r, text]);
  };

  return (
    <Flex direction="column" minHeight="80vh" gap={4}>
      <NextSeo title="Singles MTG | dragonslair.se stock and prices" />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Single search</Tab>
          <Tab>Multi search</Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0} paddingTop={8}>
            <InputField onSetValue={addSingleSearchValue} />
          </TabPanel>
          <TabPanel paddingTop={8}>
            <TextArea onSetValue={setSavedValue} />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
                    <Th
                      key={`${header.label}-header-table`}
                      isNumeric={header.isNumeric}
                    >
                      {index === 0 ? savedValue.length : ""} {header.label}
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
                  return (
                    <Th
                      key={`${header.label}-footer-table`}
                      isNumeric={header.isNumeric}
                    >
                      {header.label}
                    </Th>
                  );
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
