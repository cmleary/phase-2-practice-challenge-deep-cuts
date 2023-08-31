import React from 'react'
import Search from './Search'
import AddTrackForm from './AddTrackForm'
import TracksList from './TracksList'
import { useEffect,useState } from 'react'

function TracksPage() {

  const [tracks, setTracks] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("http://localhost:8001/tracks")
    .then(response => response.json())
    .then(trackData => setTracks(trackData))
  }, [])

  const addNewTrack = e => {
    e.preventDefault()
    const newTrack = {"title": e.target.title.value,
    "artist": e.target.artist.value,
    "BPM": e.target.BPM.value,
    "image": e.target.image.value
    }

    fetch('http://localhost:8001/tracks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(newTrack)
    }).then(response => response.json())
      .then(newTrack => setTracks([...tracks, newTrack]))
  }

  const onUpdateQuery = event => setQuery(event.target.value)

  const filterTracks = tracks.filter(track => query ? (track.title.toLowerCase().includes(query.toLowerCase()) ||  track.artist.toLowerCase().includes(query.toLowerCase())) : true);
    
  return (
    <div>
      <Search onUpdateQuery= {onUpdateQuery} query ={query}/>
      <AddTrackForm addNewTrack={addNewTrack}/>
      <TracksList tracks ={filterTracks}/>
    </div>
  )
}

export default TracksPage