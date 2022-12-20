import { useCallback, useRef } from 'react';
import { clearTimeout } from 'timers';

export const useDebounce = (delay = 300) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(true);

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};
