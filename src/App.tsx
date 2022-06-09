import React from 'react';
import { MainPiano } from './components/MainPiano';
import { MiniPiano } from './components/MiniPiano';
import { SettingsPane } from './components/SettingsPane';
import './styles/App.scss';

export default function App() {
	return (
		<div id="App">
			<SettingsPane />

			<MiniPiano />

			<MainPiano />
		</div>
	);
}
