import React from 'react';
import { CSSTransition } from 'react-transition-group'
import './transition.scss'

const duration = 350;
export const Fade = ({ children, ...props }) => (
	<CSSTransition
		{...props}
		timeout={duration}
		classNames="fade"
		appear={true}
		unmountOnExit={true}
	>
	  {children}
	</CSSTransition>
);