import { useState, useEffect } from 'react';

const useIsReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    return () => {
      setIsReady(false);
    };
  }, []);

  return isReady;
};

export default useIsReady;
