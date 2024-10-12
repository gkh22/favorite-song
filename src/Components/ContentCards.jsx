import PropTypes from 'prop-types';
import Card from './Card.jsx'

function ContentCards({ artists, removeArtist }) {
    return (
        <div className="grid gap-4 grid-rows-3 grid-cols-3 p-4 justify-items-center">
            
                {artists.map((artist, index) => (
                    <Card key={index} artist={artist} removeArtist={removeArtist} index={index}></Card>         
                ))}
            
        </div>
    );
}

ContentCards.propTypes = {
    artists: PropTypes.array.isRequired,
    artist: PropTypes.object.isRequired,
    favoriteSong: PropTypes.string.isRequired,
    removeArtist: PropTypes.func.isRequired,
};

export default ContentCards;