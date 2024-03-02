import { useContext, useEffect, useReducer, useRef } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { formReducer, INIT_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../contexts/user.context.jsx';

function JournalForm({ onSubmit, selectedItem, onDelete }) {
	const [formState, dispatch] = useReducer(formReducer, INIT_STATE);
	const { valid, values, isFormReadyToSubmit } = formState;

	const { userId } = useContext(UserContext);

	const titleRef = useRef();
	const postRef = useRef();
	const dateRef = useRef();

	const focusError = (e) => {
		switch (false) {
			case e.title:
				titleRef.current.focus();
				return;
			case e.date:
				dateRef.current.focus();
				return;
			case e.post:
				postRef.current.focus();
				return;
		}
	};

	useEffect(() => {
		if (!selectedItem) {
			dispatch({ type: 'CLEAR' });
		}
		dispatch({
			type: 'SET_VALUE',
			payload: {
				...selectedItem,
				userId,
			},
		});
	}, [selectedItem, userId]);

	useEffect(() => {
		let timerId;
		if (!valid.date || !valid.post || !valid.title) {
			focusError(valid);
			timerId = setTimeout(() => {
				dispatch({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [valid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatch({ type: 'CLEAR' });
			dispatch({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatch({ type: 'CLEAR' });
		dispatch({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatch({ type: 'SUBMIT' });
	};

	const onChange = (e) => {
		dispatch({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value },
		});
	};

	const deleteJournalItem = () => {
		onDelete(selectedItem.id);
		dispatch({ type: 'CLEAR' });
		dispatch({ type: 'SET_VALUE', payload: { userId } });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles.title}>
				<Input
					type='text'
					name='title'
					ref={titleRef}
					value={values.title}
					onChange={onChange}
					placeholder='Название вашего блога'
					appearance={'title'}
					isValid={valid.title}
				/>
				{selectedItem?.id && (
					<button
						className={styles['delete-btn']}
						type='button'
						onClick={deleteJournalItem}
					>
						<img
							src='/archieve.svg'
							alt='archieve icon'
							className={styles['archieve-icon']}
						/>
					</button>
				)}
			</div>

			<fieldset className={cn(styles['form-row'])}>
				<label className={styles['form-label']} htmlFor='date'>
					<img src='/calendar.svg' alt='calendar icon' />
					<span>Дата</span>
				</label>
				<Input
					type='date'
					name='date'
					ref={dateRef}
					value={
						values.date
							? new Date(values.date).toISOString().slice(0, 10)
							: ''
					}
					onChange={onChange}
					isValid={valid.date}
				/>
			</fieldset>

			<fieldset className={cn(styles['form-row'])}>
				<label className={styles['form-label']} htmlFor='date'>
					<img src='/folder.svg' alt='calendar icon' />
					<span>Метки</span>
				</label>
				<Input
					type='text'
					value={values.tag}
					onChange={onChange}
					name='tag'
					className={styles.input}
					isValid={true}
				/>
			</fieldset>
			<textarea
				name='post'
				id='post'
				ref={postRef}
				value={values.post}
				onChange={onChange}
				className={cn(styles.input, {
					[styles.invalid]: !valid.post,
				})}
			></textarea>
			<Button text={'Сохранить'} />
		</form>
	);
}

export default JournalForm;
