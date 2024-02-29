import './JournalItem.css';

function JournalItem({ title, date, post }) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<p className='journal-item__date'>{formatedDate}</p>
				<p className='journal-item__text'>{post}</p>
			</h2>
		</>
	);
}

export default JournalItem;
