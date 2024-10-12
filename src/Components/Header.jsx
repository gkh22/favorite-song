import Icon from '@mdi/react';
import { mdiMusicBoxMultiple } from '@mdi/js';


function Header() {
  return (
    <div className="max-h-4xl bg-spotifyBlack text-white w-screen flex justify-between p-5 items-center">
        <Icon path={mdiMusicBoxMultiple} size={1.6} />
        <h1 className="text-3xl">Your Favorite Song</h1>

    </div>
  )
}

export default Header;