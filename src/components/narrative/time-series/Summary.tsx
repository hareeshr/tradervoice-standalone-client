import * as React from 'react';
import {
  Paper,
  Skeleton,
  Typography
} from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import * as api from '../../../fake-backend/api';
import PropTypes from 'prop-types';

type SummaryProps = {
  text: string;
  color: string;
  component: string;
  sx: {mb: number;}
};

const Summary = ({text, color, ...props}: SummaryProps) => {
  
  const [summary, setSummary] = React.useState<string | null>(null);

  React.useEffect(() => {
    api.summary(text)
      .then(setSummary)
      .catch(reason => console.error(reason));
  }, [text]);

  return (
    <Paper
      {...props}
      sx={{
        ...props.sx,
        px: 2,
        py: 1
      }}
    >
      <Typography color={color} variant="h6">
        <FeedIcon sx={{verticalAlign: 'text-bottom', ml: -1, mr: 1}}/>
        In the news: {text}
      </Typography>
      <Typography color="text.secondary" textAlign="justify">
        {summary === null
          ? <React.Fragment>
              <Skeleton animation="wave"/>
              <Skeleton animation="wave"/>
              <Skeleton animation="wave" width="65%"/>
            </React.Fragment>
          : summary
        }
      </Typography>
    </Paper>
  );
};

Summary.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Summary;
