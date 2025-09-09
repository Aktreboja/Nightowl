'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { customTheme } from '../../_utils/theme';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
