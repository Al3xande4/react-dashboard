import React, { useEffect, useState } from 'react';
import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Header from './components/Header/Header';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';

function mapItems(items) {
	if (!items.length) {
		return [];
	}
	return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
	const [items, setItems] = useLocalStorage('data');

	const addItem = (item) => {
		setItems([
			...mapItems(items),
			{
				...item,
				date: new Date(item.date),
				id: Math.max(...items.map((el) => el.id), 0) + 1,
			},
		]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={mapItems(items)} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
