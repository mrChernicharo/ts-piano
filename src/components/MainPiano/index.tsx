import { useEffect, useRef } from 'react';
import { useElementWidth } from '../../hooks/useElementWidth';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useSettingsContext } from '../../hooks/useSettingsContext';
import { NOTES, NOTE_COLORS } from '../../lib/constants';
import '../../styles/MainPiano.scss';
import PianoKey from '../shared/PianoKey';

interface Props {
	onChangeOffset: (offset: number) => void;
}

export function MainPiano({ onChangeOffset }: Props) {
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
		console.log(
			firstVisibleNoteIndex,
			keyWidth,
			firstVisibleNoteIndex * keyWidth
			// pianoRef.current?.style,
			// pianoRef.current?.scrollLeft
		);

		onChangeOffset(firstVisibleNoteIndex * keyWidth);
	}, [firstVisibleNoteIndex]);

	return (
		<div
			id="MainPiano"
			//@ts-ignore
			style={{ '--key-width': `${keyWidth}px` }}
		>
			<main ref={pianoRef}>
				{NOTES.map(note => {
					const octave = Number(note.at(-1));
					return (
						<PianoKey key={note} note={note}>
							<div className="note-name">
								<span
									style={{
										backgroundColor: NOTE_COLORS[octave],
									}}
								>
									{note}
								</span>
							</div>
						</PianoKey>
					);
				})}
			</main>
		</div>
	);
}
