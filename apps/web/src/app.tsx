import { Footer } from './components/footer'
import { Header } from './components/header'
import { ProcessContacts } from './components/process-contacts'

export function App() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-[1040px] px-6 py-12">
                    <ProcessContacts />
                </div>
            </main>

            <Footer />
        </div>
    )
}
