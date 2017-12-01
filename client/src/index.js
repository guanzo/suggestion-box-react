import React from 'react';
import ReactDOM from 'react-dom';
import '@/style/index.scss';
import App from '@/components/App';
import registerServiceWorker from './registerServiceWorker';
import './assets/js/twitchExt';

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
);
registerServiceWorker();