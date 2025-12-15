'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { memo, useMemo } from 'react';
import getTheme from './theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './create-emotion-cache';

function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useMemo(() => createEmotionCache(), []);


  const theme = useMemo(() => getTheme({
    primaryColor: "#000",
    secondaryColor: "#000",
    dir: "ltr"
  }), []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default memo(ThemeRegistry);
