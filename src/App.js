import React from 'react';
import { useEffect } from 'react';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

import LanguagePicker from './LanguagePicker';
import languageContext from './contexts/languageContext';

//pishem reducera tuk za useReducer
//napr. action {type: 'setSeretWord', payload: 'party'}
const reducer = (state, action) => {
  switch(action.type){
    case 'setSecretWord':
      return {...state, secretWord: action.payload}
    case 'setLanguage': 
      return {...state, language: action.payload}
    default:
      throw new Error(`Invalid action type ${action.type}`)
  }
}

function App() {
  //const [secretWord, setSecretWord] = useState('');
  const [state, dispatch] = React.useReducer(
    reducer,
    {secretWord: null, language: 'en'}//v propsTypes sme go zadali kato string, za da niama problem pravim Spinner
  );

  // TODO: get props from shared state
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({type: 'setSecretWord', payload: secretWord});
  }

  const setLanguage = (language) => {
    dispatch({type: 'setLanguage', payload: language});
  }


  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if(state.secretWord === null) {
    return (
      <div data-test="spinner">Loading secret word...</div>
    )
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={success} />
        <Input success={success} secretWord={state.secretWord} />{/*state.secretWord idva ot useReducer*/}
        <GuessedWords guessedWords={guessedWords} />
      </languageContext.Provider>
    </div>
  );
}

export default App;
