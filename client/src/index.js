import React from 'react';
import ReactDOM from 'react-dom';
import './assets/js/twitchExt';
import '@style/index.scss';
import App from '@components/App';

import { Provider } from 'react-redux'
import store from './store'
//automatically disables itself in production
import { AppContainer } from 'react-hot-loader';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App />
			</Provider>
		</AppContainer>,
	  	document.getElementById('root'),
	)
  }
  
  render(App)
  
  // Webpack Hot Module Replacement API
  if (module.hot) {
	module.hot.accept('./components/App', () => { render(App) })
  }