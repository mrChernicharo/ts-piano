export function isFlat(note: string) {
	return note.toString().slice(1, -1) === 'b';
}
