import {
  Divider,
  Flex,
  Input,
  Link,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Text,
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
  const debouncedValue = useDebounce<string>(value, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    }

    getSearchInfo();
  }, [debouncedValue]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Popover
        isOpen={!(!debouncedValue || debouncedValue.length < 3)}
        size="669px"
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
              {allRows.map((row) => {
                return (
                  <Flex key={row.Id} flexDirection="column" gap={4}>
                    <Flex justifyContent="space-between">
                      <Link
                        onClick={() => {
                          onSetValue(row.Name);
                          setValue("");
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
                          {row.PrimaryAvailable}
                        </Text>
                        <Text>
                          {row.Price ? `${row.Price} kr` : "Not price"}
                        </Text>
                      </Flex>
                    </Flex>
                    <Divider />
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
