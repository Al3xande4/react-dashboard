import React, { useEffect, useState } from 'react';
import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Header from './components/Header/Header';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './contexts/user.context.jsx';

function mapItems(items) {
	if (!items.length) {
		return [];
	}
	return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = (item) => {
		if (item.id) {
			setItems(
				mapItems(items).map((el) =>
					el.id == item.id
						? { ...item, date: new Date(item.date) }
						: el
				)
			);
			return;
		}
		setItems([
			...mapItems(items),
			{
				...item,
				date: new Date(item.date),
				id: Math.max(...items.map((el) => el.id), 0) + 1,
			},
		]);
	};

	const deleteItem = (id) => {
		setItems([...items.filter((i) => i.id != id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton
						onClick={() => {
							setSelectedItem(null);
						}}
					/>
					<JournalList
						items={mapItems(items)}
						setItem={setSelectedItem}
					/>
				</LeftPanel>
				<Body>
					<JournalForm
						selectedItem={selectedItem}
						onSubmit={addItem}
						onDelete={deleteItem}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
