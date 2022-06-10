import { ReactNode } from 'react';
import { isFlat } from '../../lib/helpers';

interface IPianoKeyProps {
	note: string;
	children?: ReactNode;
}

export default function PianoKey({ note, children }: IPianoKeyProps) {
	const isBemol = isFlat(note);

	return (
		<div className={`${note} ${isBemol ? 'black' : 'white'} piano-key`}>
			{children}
		</div>
	);
}
