import React from 'react';
import ReactDOM from 'react-dom';
import Actions from './Actions';
//import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const currentUser = {
	  isAdmin: false
  }
  ReactDOM.render(<Actions currentUser={currentUser} />, div);
  
});
