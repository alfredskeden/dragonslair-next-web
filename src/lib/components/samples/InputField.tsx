import {
  Divider,
  Flex,
  Input,
  Link,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { DragonLairApi, RowsEntity } from "lib/types/dragonlair-api";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";

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

      const rows =
        infoResponse.data.response.rows?.filter((row) => {
          return row.Tags?.some((x) => x === "magic");
        }) ?? [];

      setAllRows(rows);
      setLoading(false);
    }

    getSearchInfo();
  }, [debouncedValue]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Popover
        isOpen={!(!debouncedValue || debouncedValue.length < 3)}
        autoFocus={false}
        placement="bottom-start"
      >
        <PopoverAnchor>
          <Input
            width={["300px", "400px", "550px"]}
            placeholder="Search singles"
            onChange={handleChange}
            value={value}
            type="search"
          />
        </PopoverAnchor>
        <PopoverContent>
          <PopoverBody>
            <Flex flexDirection="column" justifyContent="start">
              {loading && <Spinner />}
              {!allRows || (!allRows.length && <Text>No products found</Text>)}
              {allRows.length > 0 &&
                allRows.map((row) => {
                  return (
                    <Flex key={row.Id} flexDirection="column" gap={2}>
                      <Flex justifyContent="space-between">
                        <Link
                          onClick={() => {
                            onSetValue(row.Name);
                            setValue("");
                            toast({
                              title: `${row.Name} Added`,
                              status: "success",
                              duration: 1000,
                            });
                          }}
                        >
                          <u>{row.Name}</u>
                        </Link>
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
