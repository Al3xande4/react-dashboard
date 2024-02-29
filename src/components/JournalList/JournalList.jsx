import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';

function JournalList({ items }) {
	if (items.length === 0) {
		return <p>Записей пока что нет</p>;
	}

	return (
		<ul className='journal-list'>
			{items
				.sort((a, b) => b.date - a.date)
				.map((el) => (
					<CardButton key={el.id}>
						<JournalItem
							post={el.post}
							title={el.title}
							date={el.date}
						/>
					</CardButton>
				))}
		</ul>
	);
}

export default JournalList;
