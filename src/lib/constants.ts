// prettier-ignore
export const NOTES = [
                                                     'A0','Bb0','B0',
    'C1','Db1','D1','Eb1','E1','F1','Gb1','G1','Ab1','A1','Bb1','B1',
    'C2','Db2','D2','Eb2','E2','F2','Gb2','G2','Ab2','A2','Bb2','B2',
    'C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3',
    'C4','Db4','D4','Eb4','E4','F4','Gb4','G4','Ab4','A4','Bb4','B4',
    'C5','Db5','D5','Eb5','E5','F5','Gb5','G5','Ab5','A5','Bb5','B5',
    'C6','Db6','D6','Eb6','E6','F6','Gb6','G6','Ab6','A6','Bb6','B6',
    'C7','Db7','D7','Eb7','E7','F7','Gb7','G7','Ab7','A7','Bb7','B7', 
    'C8',
];

const WHITE_NOTES = NOTES.filter(n => !n.includes('b'));
const BLACK_NOTES = NOTES.filter(n => n.includes('b'));

export const NOTES_QTD = NOTES.length;
export const BLACK_NOTES_QTD = BLACK_NOTES.length;
export const WHITE_NOTES_QTD = WHITE_NOTES.length;

export const NOTE_COLORS: { [key: number]: string } = {
	9: '#e6a85e',
	8: '#ecc176',
	7: '#e08e45',
	6: '#f2db8e',
	5: '#f8f4a6',
	4: '#bdf7b7',
	3: '#9ccab7',
	2: '#7b9db7',
	1: '#5a70b7',
	0: '#3943b7',
};

console.log({
	NOTES,
	NOTES_QTD,
	WHITE_NOTES,
	WHITE_NOTES_QTD,
	BLACK_NOTES,
	BLACK_NOTES_QTD,
});
