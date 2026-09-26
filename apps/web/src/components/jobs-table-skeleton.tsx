export function JobsTableSkeleton() {
    return (
        <section className="mt-14">
            <div>
                <div className="h-7 w-32 animate-pulse rounded-md bg-surface-raised" />

                <div className="mt-2 h-5 w-56 animate-pulse rounded-md bg-surface-raised" />
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
                <div className="h-11 border-b border-line bg-surface-raised/30" />

                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex h-14 items-center gap-8 border-b border-line px-5 last:border-b-0"
                    >
                        <div className="h-4 w-40 animate-pulse rounded bg-surface-raised" />

                        <div className="h-6 w-20 animate-pulse rounded-pill bg-surface-raised" />

                        <div className="ml-auto h-4 w-10 animate-pulse rounded bg-surface-raised" />

                        <div className="h-4 w-12 animate-pulse rounded bg-surface-raised" />
                    </div>
                ))}
            </div>
        </section>
    )
}
