export type JobState =
    | 'waiting'
    | 'active'
    | 'delayed'
    | 'completed'
    | 'failed'

export type JobMetrics = {
    received: number
    valid: number
    invalid: number
    duplicates: number
}

export type JobProgress =
    | number
    | {
          percentage: number
          metrics: JobMetrics
      }

export type Job = {
    id: string
    fileName: string
    state: JobState
    progress: JobProgress
}
