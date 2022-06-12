import React from 'react';
import './App.css';
import Header from './Componets/Header';
import Quote from './Componets/Quote';
import JokesCounter from './Componets/JokesCounter';
import SelectCategory from './Componets/SelectCategory';
import NameInput from './Componets/NameInput';

function App() {
  const tmp = '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."';
  return (
    <div className="container">
      <Header />
      <Quote>
        {tmp}
      </Quote>
      <SelectCategory />
      <NameInput />
      <button type="button" className="bt draw">Draw a random Chuck Norris Joke</button>
      <div className="bottom-controls">
        <JokesCounter />
        <div className="button-wrapper">
          <button type="button" className="bt save-jokes" disabled>Save jokes</button>
        </div>
      </div>
    </div>

  );
}

export default App;
