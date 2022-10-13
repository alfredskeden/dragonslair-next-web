import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { components } from "./components";
import { config } from "./config";
import { fonts } from "./fonts";
import { styles } from "./style";

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components,
  styles,
});

export default customTheme;
