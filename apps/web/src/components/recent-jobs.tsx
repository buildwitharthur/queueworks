import { JobsTable } from './jobs-table'

export function RecentJobs() {
    return (
        <section className="mt-14">
            <div>
                <h2 className="text-[18px] leading-[26px] font-semibold tracking-[-0.01em] text-text">
                    Jobs recentes
                </h2>

                <p className="mt-0.5 text-sm leading-[22px] text-text-muted">
                    Arquivos processados nesta sessão.
                </p>
            </div>

            <div className="mt-4">
                <JobsTable />
            </div>
        </section>
    )
}
