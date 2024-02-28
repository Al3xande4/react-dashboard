import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';

function App() {
	return (
		<>
			<Button></Button>
			<CardButton>
				<JournalItem title='Header' date={new Date()} text='text' />
			</CardButton>
		</>
	);
}

export default App;
