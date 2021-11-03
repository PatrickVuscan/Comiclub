import { useState, useEffect, useRef } from 'react';

// This entire functionality was copied and then barely modified from
// https://stackoverflow.com/a/45323523 - god bless stack overflow
export default function useComponentVisible(initialIsVisible, callback) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();

      setIsComponentVisible(false);

      if (typeof callback === 'function') {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
