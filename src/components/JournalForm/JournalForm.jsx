import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './journalForm.state';


	
function JournalForm({ onSubmit }) {
	
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	useEffect(() => {
		let timerId;
		if( !isValid.post || !isValid.title  || !isValid.date )
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(()=> {
		if (isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm({ type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT'});
	};

	return (
		
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['title-div']}>
				<input type="text" onChange={onChange} value={values.title} name='title' id='title' className={cn(styles['input-title'], {
					[styles['invalid']] : !isValid.title
				})} />
				<label htmlFor="title"><img src="../archive.svg" alt="" /></label>
			</div>

			<div className={styles['date-div']}>
				<label htmlFor='date' className={styles['label']}>
					<img src="/calendar.svg" alt="" />
					<span className={styles['date-span']}>Дата</span>
				</label>
				<input type="date" onChange={onChange} value={values.date} name='date' id='date' className={cn(styles['input'], styles['date'], {
					[styles['invalid']] : !isValid.date
				})} />
			</div>

			<div className={styles['tag-div']}>
				<label htmlFor='tag' className={styles['label']}>
					<img src="/tag.svg" alt=""/>
					<span className={styles['tag-span']}>Метки</span>
				</label>
				<input type="text" onChange={onChange} value={values.tag} name='tag' id='tag' className={styles['input']} />
			</div>

			<div>
				<textarea name="post" onChange={onChange} value={values.post} id="" cols='30' rows='10' className={cn(styles['input'], styles['text'], {
					[styles['invalid']] : !isValid.post
				})} ></textarea>
			</div>
			<Button text='Сохранить' />
		</form>

	);
}
  
export default JournalForm;
  