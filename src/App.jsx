import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import ContentCards from './Components/ContentCards.jsx'


function App() {
  const CLIENT_ID = "3cbf2a6db7da4b16ada455b0c3edab9c";
  const REDIRECT_URI = "http://localhost:5173";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const[token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [favoriteSong, setFavoriteSong] = useState("");

  const ARTISTS_LIMIT = 9;

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, []);

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    if (data.artists.items[0]) {
      data.artists.items[0].favoriteSong = favoriteSong;
    }
    const addArtist = () => {
      if (artists.length < ARTISTS_LIMIT) {
        setArtists(prevArtists => [...prevArtists, data.artists.items[0]]);
      }
      else {
        alert("Max artists.");
      }
    };

    addArtist();
    console.log(data.artists.items[0]);
  };

  const removeArtist = (index) => {
    setArtists((prevArtists) => prevArtists.filter((_, i) => i !== index));
  };
  
  return (
    <div className="font-custom grid grid-rows-[auto_1fr_auto] h-screen">
     
      <Header></Header>
      <div className="grid grid-cols-[400px_1fr] ">
        <div className="bg-slate-500 text-white flex justify-center gap-2 flex-col items-center">
          <h1 className="text-3xl">Your Favorite Song</h1>
          {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
            
            : <button className="max-w-xs max-h-10 text-spotifyBlack" onClick={logout}>Logout</button>
          }
    
          <form onSubmit={searchArtists} className="grid justify-items-center">
            <div className="grid gap-4">
              <div className="flex flex-col justify-center">
                <label htmlFor="artist">Artist</label>
                <input type="text" className="border-2 bg-slate-300 border-spotifyBlack p-1 rounded-lg max-h-10 w- text-black" required onChange={e => setSearchKey(e.target.value)}/>
                <label htmlFor="song">Favorite Song</label>
                <input type="text" className="border-2 bg-slate-300 border-spotifyBlack p-1 rounded-lg max-h-10 w- text-black" required onChange={e => setFavoriteSong(e.target.value)}></input>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button type={"submit"} className="justify-self-center text-spotifyBlack max-h-10 max-w-36">Add Song</button>
                <button type="button" className="justify-self-center text-spotifyBlack max-h-10 max-w-36" onClick={() => setArtists([])}>Clear all</button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <ContentCards artists={artists} removeArtist={removeArtist}></ContentCards>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App;
