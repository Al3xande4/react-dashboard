import './JournalItem.css';

function JournalItem({ title, date, text }) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<p className='journal-item__date'>{formatedDate}</p>
				<p className='journal-item__text'>{text}</p>
			</h2>
		</>
	);
}

export default JournalItem;
