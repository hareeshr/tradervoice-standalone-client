import * as React from 'react';
import {
  CircularProgress,
  Tooltip,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { Search } from '../../../types';
import './SearchEntry.css'


type SearchEntryProps = {
  search: Search;
  onEdit: () => void;
  onDelete: () => void;
  component: string,
  sx: {m:number}
};

const SearchEntry = ({search, onEdit, onDelete, ...props}: SearchEntryProps) => {
  const icon = React.useMemo(() => {
    switch (search.state) {
      case 'loading': return <CircularProgress size={15} sx={{color: search.color}}/>;
      case 'error':
        return (
          <Tooltip arrow title={search.data}>
            <ErrorIcon fontSize="large" color="error"/>
          </Tooltip>
        );
      case 'editing': return <i className="icon-left tv-icon-edit"/>;
      default: return <i className="icon-left tv-icon-graph"/>
    }
  }, [search]);

  return (
    <div className="search-entry">
      {icon}
      {search.text}
      <button onClick={onEdit}><i className="icon tv-icon-edit"/></button>
      <button onClick={onDelete}><i className="icon tv-icon-delete"/></button>
    </div>
  )

}

export default SearchEntry;
