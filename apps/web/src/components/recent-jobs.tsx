import { JobsTable } from './jobs-table'

export function RecentJobs() {
    return (
        <section className="mt-14">
            <div>
                <h2 className="text-heading text-text">Jobs recentes</h2>

                <p className="mt-0.5 text-small text-text-muted">
                    Arquivos processados nesta sessão.
                </p>
            </div>

            <div className="mt-4">
                <JobsTable />
            </div>
        </section>
    )
}
