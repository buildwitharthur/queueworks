import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'

import { App } from './app'
import { Toaster } from './components/ui/toaster'
import { QueryProvider } from './integrations/query-client'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryProvider>
            <App />
            <Toaster />
        </QueryProvider>
    </StrictMode>,
)
