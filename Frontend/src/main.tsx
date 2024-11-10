import { createStandaloneToast } from '@chakra-ui/toast'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const { ToastContainer, toast } = createStandaloneToast()

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>

        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
              <App />
              <ToastContainer />
            </BrowserRouter>
        </Provider>
        <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
)

toast({ title: 'Chakra UI' })

