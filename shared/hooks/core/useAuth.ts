import { useEffect, useState } from "react";

import { getSessionToken } from "../../helpers";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getSessionToken();
      if (token) setIsAuth(true);
      else setIsAuth(false);
    };
    checkAuth();
  }, []);

  return isAuth;
};

export default useAuth;
