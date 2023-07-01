import React, { createContext, useState, useRef, useContext} from 'react';
import {useSearchParams} from 'react-router-dom';
import type { Search } from './../types';
import * as api from '../fake-backend/api';
import { LoadingContext } from './LoadingContext';
import { SeriesContext } from './SeriesContext';

interface SearchContextProps {
    searches: Search[],
    setSearches: React.Dispatch<React.SetStateAction<Search[]>>,
    editText: string | null,
    setEditText: React.Dispatch<React.SetStateAction<string | null>>,
    editId: string | null,
    setEditId: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement>,
    syncParams: (newSearches: Search[]) => void,
    shuffledColors: string[]
}

const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

type SearchProviderProps ={
    children: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {

    const { setTextLoading } = useContext(LoadingContext);
    const { setTextTimeSeries } = useContext(SeriesContext);


    const [searches, setSearches] = useState<Search[]>([]);
  
    const inputRef = useRef<HTMLInputElement>(null);
    const [editText, setEditText] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);

    
    const [searchParams, setSearchParams] = useSearchParams();

    
    const syncParams = (newSearches: Search[]) => {
        const currentTexts = searchParams.getAll('t');
        const newTexts = newSearches.map((s: Search) => s.text);
        if (JSON.stringify(newTexts) !== JSON.stringify(currentTexts)) {
        setSearchParams(
            (sp: URLSearchParams) => {
            sp.delete('t');
            newTexts.forEach((t: string) => sp.append('t', t));
            sp.sort();

            return sp;
            },
            { replace: true }
        );
        }
    };

    
    const COLORS = [
        '#d500f9',
        '#f50057',
        '#00a152',
        '#ff6d00',
        '#ffc400',
    ];
    
    const [shuffledColors] = React.useState<string[]>(() => COLORS
    .map(color => ({color, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({color}) => color));

    const MAX_ENTRIES = COLORS.length;
    
    const textParams: string[] = Array
    .from(new Set( // Remove duplicates.
        searchParams
        .getAll('t')
        .map(t => t.trim())
        .filter(t => t.length > 0)
    ))
    .slice(0, MAX_ENTRIES);

  // Init from params
  React.useMemo(() => {
    setSearches(textParams.map((text, i) => ({
      text,
      state: 'init',
      color: shuffledColors[i],
      timeSeries: null
    })));
  }, [shuffledColors]);
  React.useMemo(() => {
    const timeSeriesLoaded = searches
      .filter((s: Search) => s.state === 'loaded')
      .map((s: Search) => ({
        ...s.timeSeries,
        text: s.text,
        color: s.color
      }));
    const timeSeriesLoading = searches.filter(
      (s: Search) => s.state === 'loading'
    ).length;
    setTimeout(() => onTimeSeries(timeSeriesLoaded, timeSeriesLoading));

    const init = searches.filter((s: Search) => s.state === 'init');
    if (init.length > 0) {
      init.forEach((s: Search) => {
        const searchText = s.text;

        api.timeSeries(searchText)
          .then((timeSeries: any) => {
            resolveSearch(searchText, timeSeries);
          })
          .catch((reason: any) => {
            console.error('err', reason);
            resolveSearch(searchText, null);
          });
        s.state = 'loading';
      });

      setSearches((prevState: Search[]) => [...prevState]);
    }
  }, [searches]);

  const resolveSearch = (text: string, timeSeries: any | null) => {
    setSearches((prevState: Search[]) => {
      const entry = prevState.find((s: Search) => s.text === text);
      if (entry !== undefined && entry.state === 'loading') {
        entry.state = timeSeries == null ? 'error' : 'loaded';
        entry.timeSeries = timeSeries;

        return [...prevState];
      } else {
        return prevState;
      }
    });
  };

  
  const onTimeSeries = (loaded: any, loading: number) => {
    setTextTimeSeries(loaded);
    setTextLoading(loading > 0);
  };

  return (
    <SearchContext.Provider
      value={{
        searches,
        setSearches,
        editText,
        setEditText,
        editId,
        setEditId,
        inputRef,
        syncParams,
        shuffledColors
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
