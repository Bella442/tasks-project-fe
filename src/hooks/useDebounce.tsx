import { useEffect, useState } from "react";

import { NEED_TO_BE_ANY } from "@sharedTypes/globalTypes";

export const useDebounce = (value: NEED_TO_BE_ANY, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
