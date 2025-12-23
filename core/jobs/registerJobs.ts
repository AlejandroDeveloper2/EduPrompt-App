import { jobScheduler } from "./JobScheduler";

import { dailyRewardJob } from "@/features/rewards/jobs/dailyReward.job";

/** Registra los diferentes jobs de la aplicación */
export const registerJobs = () => {
  jobScheduler.register(dailyRewardJob);
};
