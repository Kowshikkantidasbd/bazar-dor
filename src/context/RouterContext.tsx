'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter as useNextRouter } from 'next/navigation';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, replace?: boolean) => void;
  queryParams: URLSearchParams;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const parseQuery = (to: string): URLSearchParams => {
  const withoutHash = to.split('#')[0];
  const queryString = withoutHash.includes('?') ? withoutHash.split('?')[1] : '';
  return new URLSearchParams(queryString);
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const nextRouter = useNextRouter();
  const pathname = usePathname() || '/';

  
  const [queryParams, setQueryParams] = useState<URLSearchParams>(
    () => new URLSearchParams()
  );

  
  useEffect(() => {
    const sync = () => setQueryParams(new URLSearchParams(window.location.search));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [pathname]);

  const navigate = useCallback(
    (to: string, replace = false) => {
      
      if (to.startsWith('#')) {
        const elem = document.querySelector(decodeURIComponent(to));
        elem?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      setQueryParams(parseQuery(to));

      if (replace) {
        nextRouter.replace(to);
      } else {
        nextRouter.push(to);
      }
    },
    [nextRouter]
  );

  const value = useMemo<RouterContextType>(
    () => ({ currentPath: pathname, navigate, queryParams }),
    [pathname, navigate, queryParams]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};