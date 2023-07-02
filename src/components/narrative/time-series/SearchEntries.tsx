import React, { useContext } from 'react'
import SearchEntry from './SearchEntry'
import { SearchContext } from './../../../context/SearchContext';
import { Search } from '../../../types';
import './SearchEntries.css'

const SearchEntries = () => {

    const { searches, setSearches, editId, setEditId, setEditText, inputRef, syncParams } = useContext(SearchContext);

    const handleBeginEdit = (id: string | null) => {
        setEditId(id);
        setEditText(
          id == null ? '' : searches.find((s: Search) => s.color === id)?.text || ''
        );
        setTimeout(() => inputRef.current?.focus());
      };
    
      const handleDelete = (id: string) => {
        setEditText(null);
        setEditId(null);
    
        const newSearches = [...searches].filter((s: Search) => s.color !== id);
        setSearches(newSearches);
        syncParams(newSearches);
      };

  return (
    <div className="searchEntries">
        {searches.map(search => (
          <SearchEntry
            key={search.color}
            component="li"
            search={{...search, state: editId === search.color ? 'editing' : (search.state === 'init' ? 'loading' : search.state)}}
            onEdit={() => handleBeginEdit(search.color)}
            onDelete={() => handleDelete(search.color)}
            sx={{m: 1}}
          />
        ))}
    </div>
  )
}

export default SearchEntries