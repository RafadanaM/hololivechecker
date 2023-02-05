import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const updateDebouncedValue = (value: T) => {
    setDebouncedValue(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue, updateDebouncedValue };
};

export default useDebounce;
