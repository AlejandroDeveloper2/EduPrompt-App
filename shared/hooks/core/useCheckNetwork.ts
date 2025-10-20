import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useCheckNetwork = () => {
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkNetwork = async () => {
      const state = await NetInfo.fetch();
      setIsInternetReachable(
        state.isInternetReachable ?? state.isConnected ?? false
      );
    };

    checkNetwork();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetReachable(
        state.isInternetReachable ?? state.isConnected ?? false
      );
    });

    return () => unsubscribe();
  }, []);

  return { isConnected: isInternetReachable };
};

export default useCheckNetwork;
