import * as React from 'react';
import { isFlat } from '../lib/helpers';

interface IPianoKeyProps {
	note: string;
}

export default function PianoKey({ note }: IPianoKeyProps) {
	const isBemol = isFlat(note);

	return (
		<div
			className={`${note} ${isBemol ? 'black' : 'white'} piano-key`}
		></div>
	);
}
