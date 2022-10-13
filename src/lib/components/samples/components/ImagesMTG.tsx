import { Flex, Image } from "@chakra-ui/react";

type Props = {
  name: string;
  imageId?: string;
};

const ImagesMTG = ({ name, imageId }: Props) => {
  return (
    <Flex className={name.includes("Foil") ? "is-foil" : ""} rounded="md">
      <Image
        src={`https://dragonslair.se/images/${imageId}/product`}
        alt={name}
        fallbackSrc="/image-not-found.png"
        rounded="md"
      />
    </Flex>
  );
};

export default ImagesMTG;
