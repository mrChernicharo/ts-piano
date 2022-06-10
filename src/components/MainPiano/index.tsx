import { useEffect, useRef } from 'react';
import { useElementWidth } from '../../hooks/useElementWidth';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useSettingsContext } from '../../hooks/useSettingsContext';
import { NOTES } from '../../lib/constants';
import '../../styles/MainPiano.scss';
import PianoKey from '../shared/PianoKey';

interface IMainPianoProps {}

export const MainPiano: React.FC<IMainPianoProps> = props => {
	const containerRef = useRef<HTMLDivElement>(null);
	const pianoRef = useRef<HTMLDivElement>(null);
	const { width: pianoWidth } = useElementWidth(pianoRef);
	const { visibleKeys, firstVisibleNoteIndex } = useSettingsContext();
	const { width: screenWidth } = useScreenWidth();
	const keyWidth = screenWidth / visibleKeys;
	// const ref = useRef(null);
	// const [progress, setProgress] = useState(0);
	// const { scrollYProgress } = useElementScroll(ref);
	// const scale = useTransform(
	// 	scrollYProgress,
	// 	[0, 0.33, 0.66, 1],
	// 	[0.5, 0.75, 0.5, 1]
	// );

	useEffect(() => {
		console.log(firstVisibleNoteIndex);
	}, [firstVisibleNoteIndex]);

	return (
		<div
			ref={containerRef}
			id="MainPiano"
			//@ts-ignore
			style={{ '--key-width': `${keyWidth}px` }}
		>
			<main ref={pianoRef}>
				{NOTES.map(note => (
					<PianoKey key={note} note={note} />
				))}
			</main>
		</div>
	);
};
