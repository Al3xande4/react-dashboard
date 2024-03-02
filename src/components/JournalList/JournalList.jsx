import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../contexts/user.context.jsx';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);
	const displayedItems = useMemo(
		() =>
			items
				.filter((el) => el.userId == userId)
				.sort((a, b) => b.date - a.date),
		[userId, items]
	);

	if (items.length === 0) {
		return <p>Записей пока что нет</p>;
	}

	return (
		<ul className='journal-list'>
			{displayedItems.map((el) => (
				<CardButton
					key={el.id}
					onClick={(e) => {
						setItem(el);
					}}
				>
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
