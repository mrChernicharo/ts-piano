import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useElementWidth } from '../hooks/useElementWidth';
import { useScreenWidth } from '../hooks/useScreenWidth';
import { useSettingsContext } from '../hooks/useSettingsContext';
import { NOTES, WHITE_NOTES_QTD } from '../lib/constants';
import '../styles/MiniPiano.scss';
import PianoKey from './PianoKey';

interface IMiniPianoProps {}

export const MiniPiano: React.FC<IMiniPianoProps> = props => {
	const { visibleKeys } = useSettingsContext();
	const pianoRef = useRef<HTMLDivElement>(null);
	const brushRef = useRef<HTMLDivElement>(null);
	const { width: pianoWidth } = useElementWidth(pianoRef);
	const { width: screenWidth } = useScreenWidth();
	const x = useMotionValue(0);

	const [brushWidth, setBrushWidth] = useState(0);

	const updateBrush = useCallback(() => {
		setBrushWidth((visibleKeys / WHITE_NOTES_QTD) * pianoWidth);
	}, [visibleKeys, pianoWidth, screenWidth]);

	const snapToClosestKey = (target: number) => {
		const [leftLimit, rightLimit] = [0, pianoWidth - brushWidth];

		if (target <= 0) return leftLimit;
		if (target >= rightLimit) return rightLimit;

		const keyWidth = pianoWidth / WHITE_NOTES_QTD;
		const targetKeyIdx = Math.floor(target / keyWidth);
		const targetKeyPos = keyWidth * (targetKeyIdx + 1);

		return targetKeyPos;
	};

	useEffect(() => updateBrush(), [visibleKeys, pianoWidth]);

	useEffect(() => {
		const brushOverflowed = x.get() + brushWidth > pianoWidth;

		if (brushOverflowed) {
			x.updateAndNotify(pianoWidth - brushWidth);
		}
	}, [brushWidth]);

	return (
		<div id="MiniPiano">
			<aside>left aside</aside>
			<main ref={pianoRef}>
				{NOTES.map(note => (
					<PianoKey key={note} note={note} />
				))}
				<motion.div
					ref={brushRef}
					className="brush"
					drag="x"
					dragElastic={0.02}
					dragTransition={{
						modifyTarget: snapToClosestKey,
						timeConstant: 40,
					}}
					style={{
						width: brushWidth,
						x,
					}}
				></motion.div>
			</main>
			<aside>right aside</aside>
		</div>
	);
};
