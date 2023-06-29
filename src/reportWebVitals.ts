import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    Promise.all([
      getCLS(onPerfEntry),
      getFID(onPerfEntry),
      getFCP(onPerfEntry),
      getLCP(onPerfEntry),
      getTTFB(onPerfEntry)
    ]).catch(error => {
      // Handle error if any of the metrics fail
      console.error('Failed to report web vitals', error);
    });
  }
};

export default reportWebVitals;
