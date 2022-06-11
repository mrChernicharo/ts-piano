import { Frequency } from 'tone/build/esm/core/type/Units';

export function isFlat(note: string) {
	return note.toString().slice(1, -1) === 'b';
}
export function getOctave(note: Frequency) {
	return Number(note.toString().at(-1));
}
