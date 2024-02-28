import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {
	const [textInput, setTextInput] = useState('');

	const textChange = (event) => {
		setTextInput(event.target.value);
	};

	const addJournalItem = (event) => {
		event.preventDefault();
		const formData = new FormData(e.target);
		const formProps = new Object.fromEntries(formData);
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title'></input>
			<input type='date' name='date'></input>
			<input
				type='text'
				name='tag'
				value={textInput}
				onChange={textChange}
			></input>
			<textarea name='post' id=''></textarea>
			<Button text={'Сохранить'} />
		</form>
	);
}

export default JournalForm;
