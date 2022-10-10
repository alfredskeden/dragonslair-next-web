import { Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  onSetValue: (text: Array<string>) => void;
};

const TextArea = ({ onSetValue }: Props) => {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setText(value);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Textarea
        placeholder={`1 Esper Sentinel\n1 Rhystic Stydy...`}
        width="500px"
        rows={7}
        onChange={handleChange}
        value={text}
        variant="filled"
      />
      <Button
        width={40}
        onClick={() => {
          const textArray = text.split("\n").map((t) => {
            const tsplit = t.split(" ");
            if (tsplit.length < 2) {
              return t;
            }

            tsplit.shift();

            return tsplit.join(" ");
          });

          onSetValue(textArray);
        }}
        variant="solid"
        background="green.300"
        mt={5}
      >
        Search
      </Button>
    </Flex>
  );
};

export default TextArea;
