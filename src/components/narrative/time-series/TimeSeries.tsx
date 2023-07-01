import React, { useContext } from 'react';
import HighChart from './HighChart';
import Chart from './Chart';
import Header from '../../Header';
import Toolbar from './Toolbar';
import './TimeSeries.css';
import Widgetbar from './Widgetbar';
import Bottombar from './Bottombar';
import LoadingChart from './LoadingChart';
import { SeriesContext } from './../../../context/SeriesContext';
import { LoadingContext } from './../../../context/LoadingContext';
import Intro from '../../Intro';

const TimeSeries = () => {

  const { combinedTimeSeries, setSymbolTimeSeries } = useContext(SeriesContext);
  const { isTextLoading } = useContext(LoadingContext);

  return (
    <div className="tv-container">
      <Header />
      <main className="flex flex-grow">
        <Toolbar />
        <div className="dashboard">
          <div className="charts tv-box">
            {combinedTimeSeries  
              // ? <Chart timeSeries={combinedTimeSeries} />
              ? <HighChart />
              : ( 
                !isTextLoading
                ? <Intro />
                : <LoadingChart />
              )
            }
          </div>
          <Bottombar />
        </div>
        <Widgetbar onTimeSeries={setSymbolTimeSeries}/>
      </main>
    </div>
  );
  
//   return (
//     <>
//       <Header/>
//       <Grid container direction="row" justifyContent="space-between">
//         <Grid container direction="column" item sm={12} md={9}>
//           <Grid container item minHeight={750} flexDirection="column">
//             {/* {combinedTimeSeries && <Chart timeSeries={combinedTimeSeries} />} */}
//             {combinedTimeSeries && <HighChart timeSeries={combinedTimeSeries} />}
//             {!combinedTimeSeries && !isTextLoading && (
//               <Box sx={{ pl: 2, pr: 8, pt: 2, my: 'auto' }}>
//                 <Intro />
//               </Box>
//             )}
//             {!combinedTimeSeries && isTextLoading && (
//               <Container
//                 maxWidth={'sm'}
//                 sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}
//               >
//                 <EngineeringIcon sx={{ alignSelf: 'center', color: theme.palette.action.disabled, fontSize: 120 }} />
//                 <Typography
//                   color={theme.palette.action.disabled}
//                   component="p"
//                   gutterBottom
//                   textAlign="center"
//                   variant="h5"
//                 >
//                   We're crunching the numbers!
//                 </Typography>
//                 <Typography color={theme.palette.action.disabled} component="p" textAlign="center">
//                   Please be patient as this may take a few seconds.
//                 </Typography>
//               </Container>
//             )}
//           </Grid>
//           <Grid item>
//             <SearchInput onTimeSeries={handleTextTimeSeries} />
//           </Grid>
//           {textTimeSeries.length > 0 && (
//             <Grid
//               item
//               component="ol"
//               sx={{
//                 listStyle: 'none',
//                 p: 0,
//                 ml: 2,
//                 mr: 8,
//               }}
//             >
//               {textTimeSeries.map((tts) => (
//                 <Summary
//                   key={tts.text}
//                   text={tts.text}
//                   color={tts.color}
//                   component="li"
//                   sx={{ mb: 2 }}
//                 />
//               ))}
//             </Grid>
//           )}
//         </Grid>
//         <Grid item sm="auto" md={3}>
//           <Symbols onTimeSeries={setSymbolTimeSeries} />
//         </Grid>
//       </Grid>
//     </>
//   );
};

export default TimeSeries;
