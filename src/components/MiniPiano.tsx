import { useRef } from 'react';
import { useElementWidth } from '../hooks/useElementWidth';
import { NOTES } from '../lib/constants';
import '../styles/MiniPiano.scss';
import Brush from './Brush';
import PianoKey from './PianoKey';

interface IMiniPianoProps {}

export const MiniPiano: React.FC<IMiniPianoProps> = props => {
	const pianoRef = useRef<HTMLDivElement>(null);
	const { width: pianoWidth } = useElementWidth(pianoRef);

	// useEffect(() => {
	// 	snapToClosestKey(x.get());
	// 	console.log('we want to snap it to the closest key on resize end');
	// }, [screenWidth]);

	return (
		<div id="MiniPiano">
			<aside>left aside</aside>
			<main ref={pianoRef}>
				{NOTES.map(note => (
					<PianoKey key={note} note={note} />
				))}

				<Brush pianoWidth={pianoWidth} />
			</main>
			<aside>right aside</aside>
		</div>
	);
};
