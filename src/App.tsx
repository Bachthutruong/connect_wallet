import "./App.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Farms from "./pages/Farms";
import Header from "./components/Header";
import { FarmsProvider } from "./context/farmsContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex } from "@chakra-ui/react";

import { ChakraProvider, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { Input } from "./theme/Input";
import { Select } from "./theme/Select";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FarmsProvider>
        <Farms />
      </FarmsProvider>
    ),
  },
]);
const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    lineHeight: "1em",
    borderRadius: "full", // <-- border radius is same for all variants and sizes
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
      height: ".4rem",
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
      height: ".6rem",
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "1px solid",
      borderColor: "black",
      color: "black",
      width: "100%",
      bg: "white",
    },
    solid: {
      border: "1px solid",
      borderColor: "black",
      bg: "#A3FF12",
      color: "black",
      width: "100%",
      _disabled: {
        color: "white",
        borderColor: "#3f3f60",
        bg: "#3f3f60",
      },
      _hover: {
        color: "white",
        borderColor: "#3f3f60",
        bg: "#3f3f60",
      },
      _active: {
        color: "white",
        borderColor: "#3f3f60",
        bg: "#3f3f60",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

const theme = extendTheme({
  components: {
    Button,
    Input,
    Select,
    // DrawerContent,
  },
  breakpoints: {
    base: "0em", // 0px
    sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
  },
  fontSizes: {
    "3xs": "6px",
    "2xs": "8px",
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "22px",
    "4xl": "24px",
    "5xl": "26px",
    "6xl": "28px",
    "7xl": "30px",
  },
  colors: {
    gray: {
      200: "#e4f5ff",
    },
    teal: {
      500: "#605d62",
    },
  },
  styles: {
    global: {
      // styles for the `body`
      html: {
        fontFamily: "Calibri",
      },
      body: {
        minHeight: "auto",
        fontFamily: "Calibri",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://endpoints.omniatech.io/v1/eth/mainnet/public`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://ethereum.publicnode.com`,
      }),
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth.llamarpc.com`,
      }),
    }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Zillapad",
  projectId: "6895534b90cf97c7464eff7751155a48",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
       
            <Flex className="zillpad-connectWallet">
              <ConnectButton />
            </Flex>
            
            
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
