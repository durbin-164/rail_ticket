"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function ThemeProviderWrapper({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
        {children}
    </ChakraProvider>
  );
}
