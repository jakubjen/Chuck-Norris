import React from 'react';

type Props = {
    chuckFace:boolean
}
function Header({ chuckFace }:Props) {
  return (
    <header>
      {chuckFace && (<img src="/images/chuck.png" className="chuck-image" alt="Chuck Noris with black hat and black sunglasses" />)}
      {!chuckFace && (<img src="/images/face.png" className="man" alt="Solid icon of man" />)}
    </header>
  );
}

export default Header;
