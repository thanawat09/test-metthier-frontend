import NiceModal from '@ebay/nice-modal-react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { NuqsAdapter } from 'nuqs/adapters/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App.tsx'
import './index.css'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <NiceModal.Provider>
            <Toaster position="top-right" />
            <App />
          </NiceModal.Provider>
        </NuqsAdapter>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
