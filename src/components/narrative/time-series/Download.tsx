import { useContext } from 'react';
// import { Button, Stack, Tooltip } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ExportToCsv } from 'export-to-csv';
// import { Weights } from '../../../types';
import { SeriesContext } from './../../../context/SeriesContext';

const Download = () => {
  const { combinedTimeSeries } = useContext(SeriesContext);

  if(!combinedTimeSeries)return null;
  

  const handleDownloadCsv = () => {
    const weights = combinedTimeSeries.weights;

    const count = weights.length;

    const headers: string[] = ['Timestamp (UTC)'];
    const pointsByTimestamp = new Map<string, (string | null)[]>();

    for (let i = 0; i < count; i++) {
      const weightsItem = weights[i];

      headers.push(`Prevalence: ${weightsItem.text}`, `Sentiment: ${weightsItem.text}`);

      weightsItem.points.forEach((p:any) => {
        const timestamp = p.tstamp.toString().substring(0, 19).replace('T', ' ');
        let values = pointsByTimestamp.get(timestamp);

        if (values === undefined) {
          values = new Array<string | null>(count * 2).fill(null);
          pointsByTimestamp.set(timestamp, values);
        }

        values[i * 2] = p.prevalence+'';
        values[i * 2 + 1] = p.sentiment+'';
      });
    }

    const data: (string | null)[][] = [];
    pointsByTimestamp.forEach((v, k) => {
      const values = [k, ...(v || [])];
      data.push(values);
    });
    data.sort((a, b) => (a[0] || '').localeCompare(b[0] || ''));
    

    new ExportToCsv({
      filename: 'tradervoice',
      showLabels: true,
      headers: headers.map((h) => `"${h.replaceAll('"', '""')}"`),
    }).generateCsv(data);
  };

  return (
    <button className={`widgetButton symbolButton`} onClick={handleDownloadCsv}>
        <i className="icon tv-icon-download"/>
        <div>
            Download <br />CSV
        </div>
    </button>
  )
};

export default Download;
