import { Suspense } from 'react'

import { Footer } from './components/footer'
import { Header } from './components/header'
import { JobsTableSkeleton } from './components/jobs-table-skeleton'
import { ProcessContacts } from './components/process-contacts'
import { RecentJobs } from './components/recent-jobs'

export function App() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-[1040px] px-6 py-12">
                    <ProcessContacts />

                    <Suspense fallback={<JobsTableSkeleton />}>
                        <RecentJobs />
                    </Suspense>
                </div>
            </main>

            <Footer />
        </div>
    )
}
