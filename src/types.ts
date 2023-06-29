
export type SymbolData = {
    symbol: string;
    label: string;
    name: string;
    type: string;
    typeSortable?: number;
    filterables?: string[];
    tstamp: string;
    price: number;
    changeAbs: number;
    changePct: number;
  }

  export type TimeSeries = {
    from: Date;
    points: SymbolData[]
  }
  
export type Article = {
    title: string,
    id: string,
    url: string,
    published: string,
    originates_title: string,
    originates_url: string,
  }

export type WeightPoint = {
    significant: any| null;
    tstamp: Date;
    value: number;
    sentiment?: number;
    prevalence?: number;
};

export type Weights = { 
    text?: string;
    color: string;
     points: WeightPoint[]; 
}[]

export type Search = {
  text: string;
  state: 'init' | 'loading' | 'loaded' | 'error' | "editing" | 'default';
  color: string;
  timeSeries: any | null;
  data?: string;
};


export type PricePoint = {
    price: number | null;
    tstamp: Date;
  };
  
export type WeightTimeSeries = {
meta: {
    from: Date;
    weightsStats: any; // Update the type to match your specific requirements
};
price: {
    color: string;
    points: PricePoint[];
};
weights: {
    color: string;
    points: WeightPoint[];
}[];
};