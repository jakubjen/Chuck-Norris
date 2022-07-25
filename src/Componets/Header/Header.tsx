import React from 'react';
import style from './Header.module.scss';

type Props = {
  chuckFace:boolean
}
function Header({ chuckFace }:Props) {
  return (
    <header>
      {chuckFace && (<img src="/images/chuck.png" className={style['chuck-image']} alt="Chuck Norris with black hat and black sunglasses" />)}
      {!chuckFace && (<img src="/images/face.jpeg" className={style.man} alt="Solid icon of man" />)}
    </header>
  );
}

export default Header;
