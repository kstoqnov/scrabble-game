import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import en from 'react-intl/locale-data/en';
import bg from 'react-intl/locale-data/bg';

import { addLocaleData } from 'react-intl';

addLocaleData(en);
addLocaleData(bg);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
