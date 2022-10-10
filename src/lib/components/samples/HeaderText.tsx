import { Grid, Heading, Link } from "@chakra-ui/react";

const HeaderText = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        <Link
          href="https://dragonslair.se/"
          isExternal
          rel="noopener noreferrer"
        >
          <u>Dragonslair</u>
        </Link>{" "}
        price and stock runner.
      </Heading>
    </Grid>
  );
};

export default HeaderText;
