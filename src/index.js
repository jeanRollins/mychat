import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//import * as serviceWorker from './serviceWorker';

let url = window.location.pathname.substr(0,5)

ReactDOM.render(<App />, document.getElementById('root'));
    






//serviceWorker.unregister();
