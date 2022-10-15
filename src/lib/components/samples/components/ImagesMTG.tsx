import { Flex, Image } from "@chakra-ui/react";

type Props = {
  name: string;
  imageId?: string;
  type?: "product" | "grid";
  foil?: boolean;
};

const ImagesMTG = ({ name, imageId, type = "product", foil = true }: Props) => {
  return (
    <Flex
      className={name.includes("Foil") && foil ? "is-foil" : ""}
      rounded="md"
    >
      <Image
        src={`https://dragonslair.se/images/${imageId}/${type}`}
        alt={name}
        fallbackSrc="/image-not-found.png"
        fallbackStrategy="onError"
        rounded="md"
      />
    </Flex>
  );
};

export default ImagesMTG;
