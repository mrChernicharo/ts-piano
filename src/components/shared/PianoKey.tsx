import { PointerEvent, ReactNode } from 'react';
import { isFlat } from '../../lib/helpers';

interface IPianoKeyProps {
	note: string;
	children?: ReactNode;
}

export default function PianoKey({ note, children }: IPianoKeyProps) {
	const isBemol = isFlat(note);

	function handleKeyPressed(e: PointerEvent<HTMLDivElement>) {
		e.preventDefault();
		console.log(e, note);
	}

	function handleKeySlurredAcross(e: PointerEvent<HTMLDivElement>) {
		e.preventDefault();
		if (e.buttons !== 1) return;
		console.log(e, note);

		// handlePlayNote(note);
	}

	return (
		<div
			className={`${note} ${isBemol ? 'black' : 'white'} piano-key`}
			onPointerDown={handleKeyPressed}
			onPointerOver={handleKeySlurredAcross}
		>
			{children}
		</div>
	);
}
