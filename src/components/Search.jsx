import React from 'react'

function Search({query,onUpdateQuery}) {
  return (
    <div className="search">
        <input
          type="text"
          placeholder="Search your Tracks"
          value = {query}
          onChange={onUpdateQuery}
        />
        <i>🔎</i>
  </div>
  )
}

export default Search