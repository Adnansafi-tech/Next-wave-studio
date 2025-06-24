import { useEffect, useState } from "react";

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const breakpoints: Record<Breakpoint, number> = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
};

const getQuery = (query: 'up' | 'down' | 'between' | Breakpoint, start: Breakpoint, end?: Breakpoint): string => {
    if (query === 'up') {
        return `(min-width:${breakpoints[start]}px)`;
    }

    if (query === 'down') {
        return `(max-width:${breakpoints[start]}px)`;
    }

    if (query === 'between' && end) {
        return `(min-width:${breakpoints[start]}px) and (max-width:${breakpoints[end]}px)`;
    }

    return `(min-width:${breakpoints[start]}px) and (max-width:${breakpoints[start] + 1}px)`;
};

export default function useResponsive(query: 'up' | 'down' | 'between' | Breakpoint, start: Breakpoint, end?: Breakpoint): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = getQuery(query, start, end);
        const mediaQueryList = window.matchMedia(mediaQuery);

        const documentChangeHandler = () => setMatches(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', documentChangeHandler);

        setMatches(mediaQueryList.matches);

        return () => {
            mediaQueryList.removeEventListener('change', documentChangeHandler);
        };
    }, [query, start, end]);

    return matches;
}

export function useWidth(): Breakpoint | 'xs' {
    const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint | 'xs'>('xs');

    useEffect(() => {
        const queries = (Object.keys(breakpoints) as Breakpoint[]).reverse().map((key) => ({
            key,
            query: `(min-width:${breakpoints[key]}px)`,
        }));

        const handlers: Array<{ query: MediaQueryList, listener: () => void }> = queries.map(({ key, query }) => {
            const mediaQueryList = window.matchMedia(query);
            const listener = () => {
                if (mediaQueryList.matches) {
                    setActiveBreakpoint(key);
                }
            };
            mediaQueryList.addEventListener('change', listener);

            if (mediaQueryList.matches) {
                setActiveBreakpoint(key);
            }

            return { query: mediaQueryList, listener };
        });

        return () => {
            handlers.forEach(({ query, listener }) => {
                query.removeEventListener('change', listener);
            });
        };
    }, []);

    return activeBreakpoint;
}