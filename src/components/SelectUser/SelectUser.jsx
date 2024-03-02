import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context.jsx';
import styles from './SelectUser.module.css';
import cn from 'classnames'

function SelectUser({ className }) {
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(+e.target.value);
	};

	return (
		<select
			className={cn(className, styles.select)}
			name='user'
			id='user'
			value={userId}
			onChange={changeUser}
		>
			<option value={1}>Антон</option>
			<option value={2}>Алексей</option>
		</select>
	);
}

export default SelectUser;
