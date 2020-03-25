import { createMuiTheme } from "@material-ui/core/styles";
import Poppins from "../../fonts/Poppins/Poppins-Regular.ttf";
import NotoSansKr from "../../fonts/Noto_Sans_KR/NotoSansKR-Regular.otf";
import Quicksand from "../../fonts/Quicksand/static/Quicksand-Regular.ttf";

// yellow: #FFDB57

const palette = {
  primary: {
    main: "#00745D"
  },
  secondary: {
    main: "#124294"
  }
};

const notoSans = {
  fontFamily: "Noto Sans KR",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
  url(${NotoSansKr}) format('opentype')`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};

const quicksand = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
  url(${Poppins}) format('truetype')`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};

const theme = createMuiTheme({
  palette,
  typography: {
    fontFamily: "Noto Sans KR"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [notoSans]
      }
    }
  }
});

export { theme };
