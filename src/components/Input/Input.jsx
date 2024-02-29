import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input(
	{ className, isValid, appearance, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			className={cn(styles.input, styles.className, {
				[styles.invalid]: !isValid,
				[styles['title-input']]: appearance,
			})}
		/>
	);
});

export default Input;
