import React, {Component} from 'react';
import messages from '../utils/languages/messages';
import Game from './Game/Game';


import { IntlProvider } from 'react-intl';
import './App.css';

const dictionary = new Set(require('../assets/dict_bg.json'));
const dictionaryEng = new Set(require('../assets/dict_eng.json'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'lang': 'bg'
    }
  }

  toggleLangHandler = () => {
    this.setState(prevState => {
      if (prevState.lang === 'en') {
        return {lang: 'bg'};
      }

      return {'lang': 'en'};
    });
  }

  render() {
    const lang = this.state.lang;
   
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div className="App">
          <Game 
            lang={lang} 
            toggleLangHandler={this.toggleLangHandler}
            dictionary={ () => lang === 'bg' ? dictionary : dictionaryEng }
          />     
        </div>
      </IntlProvider>
    );
  }
}

export default App;
