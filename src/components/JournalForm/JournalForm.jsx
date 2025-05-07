import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const INITIAL_STATE = {
	title: true,
	post: true,
	date: true
};
	
function JournalForm({ onSubmit }) {
	
	const [formValidState, setFormValidState] = useState(INITIAL_STATE);

	useEffect(() => {
		let timerId;
		timerId = setTimeout(() => {
			setFormValidState(INITIAL_STATE);
		}, 2000);
		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		
		let isFormValid = true;
		
		if(!formProps.title?.trim().length){
			setFormValidState(state => ({...state, title:false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title:true}));
		}

		if(!formProps.post?.trim().length){
			setFormValidState(state => ({...state, post:false}));
			isFormValid = false;
		}  else {
			setFormValidState(state => ({...state, post:true}));
		}

		if(!formProps.date){
			setFormValidState(state => ({...state, date:false}));
			isFormValid = false;
		}  else {
			setFormValidState(state => ({...state, date:true}));
		}

		if (!isFormValid){
			return;
		}

		onSubmit(formProps);
		// const arr = e.target.childNodes;
		// for (let el of arr) {
		// 	el.value='';
		// }
		
	};

	return (
		
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['title-div']}>
				<input type="text" name='title' id='title' className={cn(styles['input-title'], {
					[styles['invalid']] : !formValidState.title
				})} />
				<label htmlFor="title"><img src="../archive.svg" alt="" /></label>
			</div>

			<div className={styles['date-div']}>
				<label htmlFor='date' className={styles['label']}>
					<img src="/calendar.svg" alt="" />
					<span className={styles['date-span']}>Дата</span>
				</label>
				<input type="date" name='date' id='date' className={cn(styles['input'], styles['date'], {
					[styles['invalid']] : !formValidState.date
				})} />
			</div>

			<div className={styles['tag-div']}>
				<label htmlFor='tag' className={styles['label']}>
					<img src="/tag.svg" alt=""/>
					<span className={styles['tag-span']}>Метки</span>
				</label>
				<input type="text" name='tag' id='tag' className={styles['input']} />
			</div>

			<div>
				<textarea name="post" id="" cols='30' rows='10' className={cn(styles['input'], styles['text'], {
					[styles['invalid']] : !formValidState.post
				})} ></textarea>
			</div>
			<Button text='Сохранить' />
		</form>

	);
}
  
export default JournalForm;
  