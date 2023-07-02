import React, { createContext, useState } from 'react';
import type { TimeSeries as TimeSeriesType } from './../types';
import {useSearchParams} from 'react-router-dom';
import {
  useTheme
} from '@mui/material';


type CombinedTimeSeries = {
    meta: {
      from: Date;
      weightsStats: any; // TODO Specify the type for weightsStats
    };
    price: {
      color: string;
      points: any[]; // TODO Specify the type for points
    };
    weights: any[]; // TODO Specify the type for weights
  };

interface SeriesContextProps {
  combinedTimeSeries: CombinedTimeSeries | undefined;
  setCombinedTimeSeries: React.Dispatch<React.SetStateAction<CombinedTimeSeries | undefined>>;
  symbolTimeSeries: TimeSeriesType | undefined; // Replace TimeSeriesType with the actual type
  setSymbolTimeSeries: React.Dispatch<React.SetStateAction<TimeSeriesType | undefined>>;
  textTimeSeries: any[]; // Replace any[] with the appropriate type
  setTextTimeSeries: React.Dispatch<React.SetStateAction<any[]>>;
  isSentimentSelected: boolean;
  setSentimentSelected: React.Dispatch<React.SetStateAction<boolean>>;
  handleSentimentSelection: (selection: boolean) => void;
  selectedSymbol: string | null;
  setSelectedSymbol:React.Dispatch<React.SetStateAction<string | null>>;
  selectedCross: boolean;
  toggleCross: () => void;
}

const SeriesContext = createContext<SeriesContextProps>({} as SeriesContextProps);

type SeriesProviderProps ={
    children: React.ReactNode;
}

const SP_VALUES = 'values';
const SP_VALUES_SENTIMENT = 'sentiment';

const SeriesProvider = ({ children }: SeriesProviderProps) => {
  const theme = useTheme();

  const [combinedTimeSeries, setCombinedTimeSeries] = useState<CombinedTimeSeries | undefined>();
  const [symbolTimeSeries, setSymbolTimeSeries] = useState<TimeSeriesType | undefined>();
  const [textTimeSeries, setTextTimeSeries] = useState<any[]>([]);
  const [selectedSymbol, setSelectedSymbol] = React.useState<string | null>(null);
  const [selectedCross, setSelectedCross] = React.useState<boolean>(false);

  const toggleCross = () => {
    setSelectedCross((prevCross) => !prevCross);
  };
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSentimentSelected, setSentimentSelected] = React.useState(
    searchParams.get(SP_VALUES) === SP_VALUES_SENTIMENT
  );
  
  const handleSentimentSelection = (selection: boolean): void => {
    setSearchParams(
      (sp: URLSearchParams) => {
        if (selection) {
          sp.set(SP_VALUES, SP_VALUES_SENTIMENT);
        } else {
          sp.delete(SP_VALUES);
        }
  
        return sp;
      },
      { replace: true }
    );
    setSentimentSelected(selection);
  };

  React.useMemo(() => {
    const isSymbolsLoaded = symbolTimeSeries !== undefined;
    const isAnyTextsLoaded = textTimeSeries.length > 0;
    if (isSymbolsLoaded || isAnyTextsLoaded) {
      const earliestDate = textTimeSeries
        .concat(isSymbolsLoaded ? [symbolTimeSeries] : [])
        .map((ts) => new Date(ts.from))
        .reduce((min, date) => (date < min ? date : min));

      setCombinedTimeSeries({
        meta: {
          from: earliestDate,
          weightsStats: isAnyTextsLoaded ? textTimeSeries[0].statistics : null, // TODO Which one to use? Or have stats in separate endpoint?
        },
        price: {
          color: theme.palette.primary.main,
          points: isSymbolsLoaded ? symbolTimeSeries.points : [],
        },
        weights: textTimeSeries,
      });
    } else {
      setCombinedTimeSeries(undefined);
    }
  }, [symbolTimeSeries, textTimeSeries]);

  return (
    <SeriesContext.Provider
      value={{
        combinedTimeSeries,
        setCombinedTimeSeries,
        symbolTimeSeries,
        setSymbolTimeSeries,
        textTimeSeries,
        setTextTimeSeries,
        isSentimentSelected,
        setSentimentSelected,
        handleSentimentSelection,
        selectedSymbol,
        setSelectedSymbol,
        selectedCross,
        toggleCross
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
};

export { SeriesContext, SeriesProvider };
