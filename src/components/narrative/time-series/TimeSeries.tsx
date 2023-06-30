import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import Symbols from './Symbols';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Chart from './Chart';
import SearchInput from './SearchInput';
import Intro from '../../Intro';
import Summary from './Summary';
import type { TimeSeries as TimeSeriesType } from '../../../types';
import HighChart from './HighChart';

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

const TimeSeries = () => {
  const theme = useTheme();

  const [combinedTimeSeries, setCombinedTimeSeries] = React.useState<CombinedTimeSeries | undefined>();
  const [symbolTimeSeries, setSymbolTimeSeries] = React.useState<TimeSeriesType>(); // TODO Specify the type
  const [textTimeSeries, setTextTimeSeries] = React.useState<any[]>([]); // TODO Specify the type
  const [isTextLoading, setTextLoading] = React.useState(false);

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

  const handleTextTimeSeries = (loaded: any, loading: number) => {
    setTextTimeSeries(loaded);
    setTextLoading(loading > 0);
  };

  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid container direction="column" item sm={12} md={9}>
        <Grid container item minHeight={750} flexDirection="column">
          {combinedTimeSeries && <Chart timeSeries={combinedTimeSeries} />}
          {combinedTimeSeries && <HighChart timeSeries={combinedTimeSeries} />}
          {!combinedTimeSeries && !isTextLoading && (
            <Box sx={{ pl: 2, pr: 8, pt: 2, my: 'auto' }}>
              <Intro />
            </Box>
          )}
          {!combinedTimeSeries && isTextLoading && (
            <Container
              maxWidth={'sm'}
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}
            >
              <EngineeringIcon sx={{ alignSelf: 'center', color: theme.palette.action.disabled, fontSize: 120 }} />
              <Typography
                color={theme.palette.action.disabled}
                component="p"
                gutterBottom
                textAlign="center"
                variant="h5"
              >
                We're crunching the numbers!
              </Typography>
              <Typography color={theme.palette.action.disabled} component="p" textAlign="center">
                Please be patient as this may take a few seconds.
              </Typography>
            </Container>
          )}
        </Grid>
        <Grid item>
          <SearchInput onTimeSeries={handleTextTimeSeries} />
        </Grid>
        {textTimeSeries.length > 0 && (
          <Grid
            item
            component="ol"
            sx={{
              listStyle: 'none',
              p: 0,
              ml: 2,
              mr: 8,
            }}
          >
            {textTimeSeries.map((tts) => (
              <Summary
                key={tts.text}
                text={tts.text}
                color={tts.color}
                component="li"
                sx={{ mb: 2 }}
              />
            ))}
          </Grid>
        )}
      </Grid>
      <Grid item sm="auto" md={3}>
        <Symbols onTimeSeries={setSymbolTimeSeries} />
      </Grid>
    </Grid>
  );
};

export default TimeSeries;
