import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  // eslint-disable-next-line no-unused-vars
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    let elementClicked = false;
    const listener = (event: Event) => {
      refs.forEach((ref) => {
        const el = ref?.current;
        if (!el || el.contains((event?.target as Node) || null)) {
          elementClicked = true;
        }
      });
      if (!elementClicked) handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]); // Reload only if ref or handler changes
};

export default useOnClickOutside;
