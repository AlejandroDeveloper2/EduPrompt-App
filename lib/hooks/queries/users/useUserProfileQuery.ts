import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { getSessionToken } from "@/lib/helpers";
import { getUserProfile } from "@/services/users";

const useUserProfileQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { userStats, setUserStats } = useUserOfflineStore();

  return useQuery({
    queryKey: ["user_profile"],
    queryFn: async () => {
      const token = await getSessionToken();

      if (isConnected && token) {
        const userProfile = await getUserProfile();
        setUserStats({
          ...userProfile,
          sync: true,
        });
        return userProfile;
      } else {
        return userStats;
      }
    },
    staleTime: 1000 * 60, // cache 1min
    // gcTime: 1000 * 60 * 5,
  });
};

export default useUserProfileQuery;
