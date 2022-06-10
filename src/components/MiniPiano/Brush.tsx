import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useSettingsContext } from '../../hooks/useSettingsContext';
import { WHITE_NOTES_QTD } from '../../lib/constants';

interface Props {
	pianoWidth: number;
}

export default function Brush({ pianoWidth }: Props) {
	const { visibleKeys, setFirstVisibleNoteIndex } = useSettingsContext();

	const brushRef = useRef<HTMLDivElement>(null);
	const { width: screenWidth } = useScreenWidth();

	const [brushWidth, setBrushWidth] = useState(0);
	const x = useMotionValue(0);

	const updateBrush = useCallback(() => {
		setBrushWidth((visibleKeys / WHITE_NOTES_QTD) * pianoWidth);
	}, [visibleKeys, pianoWidth, screenWidth]);

	function snapToClosestKey(target: number) {
		const [leftLimit, rightLimit] = [0, pianoWidth - brushWidth];

		if (target <= 0) {
			setFirstVisibleNoteIndex(0);
			return leftLimit;
		}

		const keyWidth = pianoWidth / WHITE_NOTES_QTD;
		const targetKeyIdx = Math.floor(target / keyWidth);
		const targetKeyPos = keyWidth * targetKeyIdx;

		// gotta debug this:
		setFirstVisibleNoteIndex(targetKeyIdx);
		// setFirstVisibleNoteIndex(targetKeyIdx);

		if (target >= rightLimit) {
			return rightLimit;
		}

		return targetKeyPos;
	}

	useEffect(updateBrush, [visibleKeys, pianoWidth, screenWidth]);

	useEffect(() => {
		const brushOverflowed = x.get() + brushWidth > pianoWidth;

		if (brushOverflowed) {
			x.updateAndNotify(pianoWidth - brushWidth);
		}

		snapToClosestKey(x.get());
	}, [brushWidth]);

	return (
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
	);
}
