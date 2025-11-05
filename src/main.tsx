
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store'
import './index.css'
const queryClient = new QueryClient()

const config = {
  initialColorMode: "dark",
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
