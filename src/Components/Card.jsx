
export default function Card({ artist, removeArtist, index } ) {
   
    return (
        <div className="shadow-xl gap-3 text-black max-w-xs max-h-xs grid justify-items-center p-3 bg-spotifyGreen">
            <img src={artist.images[0].url} alt="API image" className="max-w-56 max-h-56"></img>
            <h1 className="text-base">{artist.favoriteSong}</h1>
            <button onClick={() => removeArtist(index)}>Remove</button>
        </div>
    )
}