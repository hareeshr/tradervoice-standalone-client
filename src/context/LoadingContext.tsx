import React, { createContext, useState } from 'react';

interface LoadingContextProps {
  isTextLoading: boolean;
  setTextLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps);

type LoadingProviderProps ={
    children: React.ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {

    const [isTextLoading, setTextLoading] = React.useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isTextLoading,
        setTextLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
