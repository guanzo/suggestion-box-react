import React from 'react';
import ReactDOM from 'react-dom';
import '@/style/index.scss';
import App from '@/components/App';
import registerServiceWorker from './registerServiceWorker';
import './assets/js/twitchExt';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
