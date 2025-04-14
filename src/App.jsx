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
import { useState } from 'react';

const INTITAL_DATA = [
	// {
	// 	id: 1,
	// 	title: 'Подготовка к обновлению курсов',
	// 	date: new Date(),
	// 	text: 'Горные походы открывают удивительные природные ландшафты'
      
	// },
	// {
	// 	id: 2,
	// 	title: 'Поход в годы',
	// 	date: new Date(),
	// 	text: 'Основная же цель в горном походе – не покорение вершин, а преодоление перевалов'
      
	// },
];
	
function App() {
	const [items, setItems] = useState(INTITAL_DATA);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			text: item.text,
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
