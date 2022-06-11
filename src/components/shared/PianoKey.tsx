import { PointerEvent, ReactNode, useCallback, useState } from 'react';
import { Frequency } from 'tone/build/esm/core/type/Units';
import { NOTE_COLORS } from '../../lib/constants';
import { getOctave, isFlat } from '../../lib/helpers';
import { playNote } from '../../lib/tone.fns';

interface IPianoKeyProps {
	note: string;
	children?: ReactNode;
}

export default function PianoKey({ note, children }: IPianoKeyProps) {
	const isBemol = isFlat(note);

	const [isActive, setIsActive] = useState(false);

	const handlePlayNote = useCallback((note: Frequency) => {
		setIsActive(true);
		playNote(note);
	}, []);

	function handleKeyPressed(e: PointerEvent<HTMLDivElement>) {
		e.preventDefault();
		// console.log(e, note);
		handlePlayNote(note);
	}

	function handleKeySlurredAcross(e: PointerEvent<HTMLDivElement>) {
		e.preventDefault();
		if (e.buttons !== 1) return;
		// console.log(e, note);
		handlePlayNote(note);
	}

	function handleKeyReleased(e: PointerEvent<HTMLDivElement>) {
		e.preventDefault();
		// console.log('release', e, note);
		setIsActive(false);
		// releaseNote(note);
	}

	function handleKeyLeave(e: PointerEvent<HTMLDivElement>) {
		e.preventDefault();
		if (e.buttons !== 1) return;
		setIsActive(false);
	}

	return (
		<div
			className={`${note} ${isBemol ? 'black' : 'white'} piano-key`}
			style={{
				backgroundColor: isActive ? NOTE_COLORS[getOctave(note)] : '',
			}}
			onPointerDown={handleKeyPressed}
			onPointerOver={handleKeySlurredAcross}
			onPointerLeave={handleKeyLeave}
			onPointerUp={handleKeyReleased}
		>
			{children}
		</div>
	);
}
