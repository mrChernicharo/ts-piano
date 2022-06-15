import { useRef } from 'react';
import { MainPiano } from './components/MainPiano';
import { MiniPiano } from './components/MiniPiano';
import { SettingsPane } from './components/SettingsPane';
import { useSettingsContext } from './hooks/useSettingsContext';
import './styles/App.scss';

export default function App() {
	const { setFirstVisibleNoteIndex } = useSettingsContext();
	const containerRef = useRef<HTMLDivElement>(null);
	// const ref = useRef(null);
	// const [progress, setProgress] = useState(0);
	// const { scrollYProgress } = useElementScroll(ref);
	// const scale = useTransform(
	// 	scrollYProgress,
	// 	[0, 0.33, 0.66, 1],
	// 	[0.5, 0.75, 0.5, 1]
	// );

	function handleChangePianoOffset(
		offset: number,
		behavior: 'auto' | 'smooth'
	) {
		containerRef.current?.scrollTo({
			behavior,
			left: offset,
		});
	}

	return (
		<div ref={containerRef} id="App">
			<SettingsPane />

			<MiniPiano />

			<MainPiano onChangeOffset={handleChangePianoOffset} />
		</div>
	);
}
