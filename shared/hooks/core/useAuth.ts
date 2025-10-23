import { useEffect, useState } from "react";

import { getSessionToken } from "../../utils";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = getSessionToken();
      if (token) setIsAuth(true);
      else setIsAuth(false);
    };
    checkAuth();
  }, []);

  return isAuth;
};

export default useAuth;
