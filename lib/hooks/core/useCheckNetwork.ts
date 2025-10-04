import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useCheckNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return { isConnected };
};

export default useCheckNetwork;
