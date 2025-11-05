import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
const queryClient = new QueryClient()

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
createRoot(document.getElementById('root')!).render(


  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </Provider>

  ,
)
