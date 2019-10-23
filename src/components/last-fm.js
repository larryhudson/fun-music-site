import React from "react"
import axios from "axios"

import "./last-fm.scss"

export default () => {
  const [tracks, setTracks] = React.useState([])
  const [apiResponse, setApiResponse] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    axios
      .get("https://ws.audioscrobbler.com/2.0/", {
        params: {
          method: "user.getrecenttracks",
          user: "harryludson",
          api_key: "43c1cbeecc3f5b3e29fa28fb740255bc",
          format: "json",
          limit: "50",
        },
      })
      .then(response => {
        setApiResponse(response.data)
        setTracks(
          response.data.recenttracks.track.map(track => ({
            artist: track.artist["#text"],
            album: track.album["#text"],
            name: track.name,
            image: track.image[3]["#text"],
            url: track.url,
          }))
        )
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError(error.message)
      })
    setLoading(false)
  }, [])
  return (
    <div>
      <h2>What is Larry listening to?</h2>
      <p>
        This is getting information from my{" "}
        <a href="https://last.fm/user/harryludson">Last.fm page</a>.
      </p>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {tracks.length > 0 && <Albums tracks={tracks} />}
      {tracks.length > 0 && <Tracks tracks={tracks} />}
      {apiResponse && (
        <pre>{JSON.stringify(apiResponse.recenttracks.track, null, 4)}</pre>
      )}
    </div>
  )
}

const Loading = () => <div>Loading...</div>

const Error = ({ error }) => <div>Error! {error.message}</div>

const Albums = ({ tracks }) => {
  var albums = []
  tracks.forEach(track => {
    console.log(track)
    const album = track.album
    const artist = track.artist
    const image = track.image
    if (!albums.map(a => a.image).includes(image)) {
      albums.push({
        album,
        artist,
        image,
      })
    }
  })
  console.log(albums)

  return (
    <ol>
      {albums.map(album => (
        <li key={album.image}>
          <img src={album.image} />
          {album.album} by {album.artist}
        </li>
      ))}
    </ol>
  )
}

const Tracks = ({ tracks }) => {
  return (
    <ol className="tracks">
      {tracks.map(track => (
        <Track {...track} />
      ))}
    </ol>
  )
}

const Track = ({ url, name, artist, album, image }) => {
  return (
    <li>
      <div className="img-container">
        <img src={image} alt="" />
      </div>
      <div className="text">
        <a className="song-link" href={url}>
          {name}
        </a>
        <span className="artist-name">{artist}</span>
        <span className="album">{album}</span>
      </div>
    </li>
  )
}
