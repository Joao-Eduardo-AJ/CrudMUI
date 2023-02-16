import { useCallback, useRef } from "react";

export const useDebounce = (delay: number, notDelayInFirstTime = true) => {
  const isFirstTime = useRef(notDelayInFirstTime);
  const deboucing = useRef(0);

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (deboucing.current) {
          clearTimeout(deboucing.current);
        }

        deboucing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};