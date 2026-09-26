import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './components/app'
import { QueryProvider } from './integrations/query-client'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryProvider>
            <App />
        </QueryProvider>
    </StrictMode>,
)
