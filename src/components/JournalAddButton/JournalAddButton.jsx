import CardButton from '../CardButton/CardButton';
import styles from './JournalAddButton.module.css';

function JournalAddButton() {

	return (
		<CardButton className={styles['journal-add']}>
			<img width='11px' src="/plus.svg" alt="plus" />
			Новое Воспоминание
		</CardButton>
	);
}
  
export default JournalAddButton;
  