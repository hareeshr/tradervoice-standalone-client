import React, { FormEvent, useContext } from 'react'
import { SearchContext } from '../../../context/SearchContext';
import './SearchInput.css'


const SearchInput = () => {

    
    const { searches, setSearches, editId, setEditId, editText, setEditText, inputRef, syncParams, shuffledColors } = useContext(SearchContext);


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        setEditText(null);
        setEditId(null);
    
        const newText = editText?.trim() || '';
        if (
          newText.length > 0 &&
          !searches.find(s => s.text === newText)
        ) {
          let isChange = true;
          const newSearches = [...searches];
          if (editId == null) {
            newSearches.push({
              text: newText,
              state: 'init',
              color: shuffledColors.find(
                (c: string) => !newSearches.map((s) => s.color).includes(c)
              ) || '',
              timeSeries: null
            });
          } else {
            const entry = searches.find(s => s.color === editId);
            if (entry !== undefined && entry.text !== newText) {
              entry.text = newText;
              entry.state = 'init';
              entry.timeSeries = null;
            } else {
              isChange = false;
            }
          }
    
          if (isChange) {
            setSearches(newSearches);
            syncParams(newSearches);
          }
        }
      };


  return (
    <form onSubmit={handleSubmit} className="searchForm">
        <i className="icon tv-icon-search"/>
        <input
            type="text"
            ref={inputRef}
            placeholder="Explore your narrative"
            value={editText || ''}
            onChange={e => setEditText(e.target.value)}
            autoComplete="on"
        />
        <button type="submit"><i className="icon tv-icon-submit"/></button>
    </form>
  )
}

export default SearchInput