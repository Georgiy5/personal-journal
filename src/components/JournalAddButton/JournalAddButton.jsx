import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton() {

	return (
		<CardButton className='journal-add'>
			<img width='11px' src="/plus.svg" alt="plus" />
			Новое Воспоминание
		</CardButton>
	);
}
  
export default JournalAddButton;
  