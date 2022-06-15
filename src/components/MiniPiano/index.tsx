import { useRef } from 'react';
import {
	FaBackward,
	FaCaretLeft,
	FaCaretRight,
	FaForward,
} from 'react-icons/fa';
import { useElementWidth } from '../../hooks/useElementWidth';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useSettingsContext } from '../../hooks/useSettingsContext';
import { NOTES } from '../../lib/constants';
import '../../styles/MiniPiano.scss';
import PianoKey from '../shared/PianoKey';
import Brush from './Brush';

interface IMiniPianoProps {}

export const MiniPiano: React.FC<IMiniPianoProps> = props => {
	const pianoRef = useRef<HTMLDivElement>(null);

	const { firstVisibleNoteIndex, setFirstVisibleNoteIndex } =
		useSettingsContext();
	const { width: pianoWidth } = useElementWidth(pianoRef);
	const { width: screenWidth } = useScreenWidth();

	// useEffect(() => {
	// 	snapToClosestKey(x.get());
	// 	console.log('we want to snap it to the closest key on resize end');
	// }, [screenWidth]);

	function handleChangeVisibleKeys(offset: number) {
		setFirstVisibleNoteIndex(fn => fn + offset);
	}

	return (
		<div id="MiniPiano">
			<div className="content">
				<aside>
					<button onClick={() => handleChangeVisibleKeys(-7)}>
						<FaBackward />
					</button>

					<button onClick={() => handleChangeVisibleKeys(-1)}>
						<FaCaretLeft />
					</button>
				</aside>

				<main ref={pianoRef}>
					{NOTES.map(note => (
						<PianoKey key={note} note={note} />
					))}

					<Brush pianoWidth={pianoWidth} screenWidth={screenWidth} />
				</main>

				<aside>
					<button onClick={() => handleChangeVisibleKeys(+1)}>
						<FaCaretRight />
					</button>
					<button onClick={() => handleChangeVisibleKeys(+7)}>
						<FaForward />
					</button>
				</aside>
			</div>
		</div>
	);
};
