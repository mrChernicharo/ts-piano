import { useEffect, useRef } from 'react';
import { MainPiano } from './components/MainPiano';
import { MiniPiano } from './components/MiniPiano';
import { SettingsPane } from './components/SettingsPane';
import './styles/App.scss';

export default function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	function handleChangePianoOffset(offset: number) {
		containerRef.current?.scrollTo({ behavior: 'smooth', left: offset });
	}

	useEffect(() => {}, []);

	return (
		<div ref={containerRef} id="App">
			<SettingsPane />

			<MiniPiano />

			<MainPiano onChangeOffset={handleChangePianoOffset} />
		</div>
	);
}
