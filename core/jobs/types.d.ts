type JobInterval = "daily" | "hourly" | number;

interface Job {
  id: string;
  interval: JobInterval;
  run: () => Promise<void> | void;
}

export type { Job, JobInterval };
