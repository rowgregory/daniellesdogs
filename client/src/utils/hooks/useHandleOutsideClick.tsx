import { useEffect } from 'react';

const useHandleOutsideClick = (ref: any, action: any) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        action();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [action, ref]);
};

export default useHandleOutsideClick;
