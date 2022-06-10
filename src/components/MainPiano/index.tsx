import { useEffect, useRef } from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useSettingsContext } from '../../hooks/useSettingsContext';
import { NOTES, NOTE_COLORS } from '../../lib/constants';
import '../../styles/MainPiano.scss';
import PianoKey from '../shared/PianoKey';

interface Props {
	onChangeOffset: (offset: number, behavior: 'auto' | 'smooth') => void;
}

export function MainPiano({ onChangeOffset }: Props) {
	const pianoRef = useRef<HTMLDivElement>(null);
	const { visibleKeys, firstVisibleNoteIndex } = useSettingsContext();
	const { width: screenWidth } = useScreenWidth();
	const keyWidth = screenWidth / visibleKeys;

	useEffect(() => {
		setTimeout(
			() => onChangeOffset(firstVisibleNoteIndex * keyWidth, 'auto'),
			200
		);
	}, [visibleKeys, screenWidth]);

	useEffect(() => {
		setTimeout(
			() => onChangeOffset(firstVisibleNoteIndex * keyWidth, 'smooth'),
			400
		);
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
