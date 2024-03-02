import SelectUser from '../SelectUser/SelectUser';
import './Header.css';

function Header() {
	return (
		<header className='header'>
			<img className='logo' src='/logo.svg' alt='logo img' />
			<SelectUser className='select' />
		</header>
	);
}

export default Header;
