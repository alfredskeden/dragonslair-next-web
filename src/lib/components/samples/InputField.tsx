import {
  Divider,
  Flex,
  Input,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { DragonLairApi, RowsEntity } from "lib/types/dragonlair-api";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import ImagesMTG from "./components/ImagesMTG";

type Props = {
  onSetValue: (text: string) => void;
};

const InputField = ({ onSetValue }: Props) => {
  const [value, setValue] = useState<string>("");
  const [allRows, setAllRows] = useState<Array<RowsEntity>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, 500);
  const toast = useToast();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setValue(event.target.value);
  };

  // Fetch API (optional)
  useEffect(() => {
    if (!debouncedValue || debouncedValue.length < 3) {
      setAllRows([]);
      return;
    }

    async function getSearchInfo() {
      const infoResponse = await axios.get<DragonLairApi>(
        `/api/fetch-item?name=${debouncedValue.split(" ").join("+")}`
      );

      if (infoResponse.status !== 200) {
        toast({
          title: "Error fetching data",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const rows =
        infoResponse.data.response.rows?.filter((row) => {
          return (
            row.Tags?.some((x) => x === "magic") &&
            row.Tags?.some((s) => s === "card-singles")
          );
        }) ?? [];

      setAllRows(rows);
      setLoading(false);
    }

    getSearchInfo();
  }, [debouncedValue]);

  const addItem = (name: string) => {
    onSetValue(name);
    setValue("");
    toast({
      title: `${name} Added`,
      status: "success",
      duration: 1000,
    });
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Popover
        isOpen={!(!debouncedValue || debouncedValue.length < 3)}
        autoFocus={false}
        placement="bottom-start"
      >
        <PopoverAnchor>
          <Input
            width={"100%"}
            placeholder="Search singles"
            onChange={handleChange}
            value={value}
            type="search"
          />
        </PopoverAnchor>
        <PopoverContent boxSize="fit-content">
          <PopoverBody>
            <Flex flexDirection="column" justifyContent="start">
              {loading && <Spinner />}
              {!allRows || (!allRows.length && <Text>No products found</Text>)}
              {allRows.length > 0 &&
                allRows.map((row) => {
                  return (
                    <Flex key={row.Id} flexDirection="column" gap={2}>
                      <Flex
                        justifyContent="space-between"
                        gap={8}
                        tabIndex={0}
                        onClick={() => addItem(row.Name)}
                        onKeyUp={(e) => e.key === "Enter" && addItem(row.Name)}
                      >
                        <Flex gap={2}>
                          <Tooltip
                            hasArrow
                            label={
                              <Flex position="relative">
                                <ImagesMTG
                                  name={row.Name}
                                  imageId={row.ImageId}
                                  type={"grid"}
                                />
                              </Flex>
                            }
                          >
                            <Text>{row.Name}</Text>
                          </Tooltip>
                        </Flex>
                        <Flex gap={2}>
                          <Text
                            color={
                              !row.PrimaryAvailable ? "red.300" : "green.300"
                            }
                          >
                            {row.PrimaryAvailable} pc
                          </Text>
                          <Text>
                            {row.Price ? `${row.Price} kr` : "Not priced"}
                          </Text>
                        </Flex>
                      </Flex>
                      <Divider mb={2} />
                    </Flex>
                  );
                })}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default InputField;
