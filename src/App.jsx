import LeftPanel from '../layouts/LeftPanel/LeftPanel';
import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from '../layouts/Body/Body';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';


function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (items.length){
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			text: item.post,
			date: new Date(item.date),
			title: item.title,
			id: oldItems.length > 0 ? Math.max(...oldItems.map( i => i.id)) + 1 : 1,
		}]);
	};



	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				<JournalForm  onSubmit={addItem}/>
			</Body>
			
			
		</div>
	);
}

export default App;
